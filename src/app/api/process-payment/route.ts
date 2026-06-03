import { MercadoPagoConfig, Payment } from 'mercadopago';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || '',
});

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    
    const { formData, cart, customer, shipping, cartTotal } = requestBody;
    const paymentDataPayload = formData || requestBody;

    const {
      token,
      issuer_id,
      payment_method_id,
      transaction_amount,
      installments,
      payer,
    } = paymentDataPayload;

    if (!payment_method_id || (!transaction_amount && !cartTotal) || !payer?.email) {
      return NextResponse.json(
        { error: "Dados de pagamento incompletos." },
        { status: 400 }
      );
    }

    const finalAmount = cartTotal > 0 ? cartTotal : transaction_amount;

    // 1. Criar o pedido no banco de dados com status "created"
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_name: customer?.name || payer?.email,
        customer_email: payer.email,
        customer_phone: customer?.phone || null,
        document: payer?.identification?.number || null,
        total_amount: finalAmount,
        payment_status: 'created',
        payment_method: payment_method_id,
        shipping_zipcode: shipping?.zipcode || null,
        shipping_street: shipping?.street || null,
        shipping_number: shipping?.number || null,
        shipping_city: shipping?.city || null,
        shipping_state: shipping?.state || null,
      })
      .select('id')
      .single();

    if (orderError || !orderData) {
      console.error('Erro ao criar pedido no banco:', orderError);
      return NextResponse.json({ error: 'Erro interno ao gerar pedido.' }, { status: 500 });
    }

    const orderId = orderData.id;

    // 2. Criar os itens do pedido no banco de dados
    if (cart && Array.isArray(cart) && cart.length > 0) {
      const orderItems = cart.map((item: any) => ({
        order_id: orderId,
        product_id: item.id || 'N/A',
        product_name: `${item.name} (${item.aroma})`,
        quantity: item.qty,
        unit_price: item.priceNum,
        total_price: item.priceNum * item.qty,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) {
        console.error('Erro ao salvar itens do pedido:', itemsError);
      }
    }

    // 3. Chamar a API do Mercado Pago
    const payment = new Payment(client);

    const result = await payment.create({
      body: {
        transaction_amount: Number(finalAmount),
        token: token, // Opcional se for Pix
        description: `Pedido NUV Aromas #${orderId.substring(0,8)}`,
        installments: Number(installments) || 1,
        payment_method_id,
        issuer_id,
        payer: {
          email: payer.email,
          identification: payer.identification,
        },
        external_reference: orderId,
        metadata: {
          order_id: orderId,
          site: process.env.NEXT_PUBLIC_SITE_URL || 'nuvaromas.shop',
        },
      },
      requestOptions: {
        idempotencyKey: orderId, // Previne cobrança duplicada
      },
    });

    // 4. Atualizar o pedido com o resultado do Mercado Pago
    await supabase
      .from('orders')
      .update({
        mercado_pago_payment_id: String(result.id),
        payment_status: result.status,
        mercado_pago_status_detail: result.status_detail,
      })
      .eq('id', orderId);

    return NextResponse.json({
      order_id: orderId,
      payment_id: result.id,
      status: result.status,
      status_detail: result.status_detail,
      qr_code: result.point_of_interaction?.transaction_data?.qr_code,
      qr_code_base64: result.point_of_interaction?.transaction_data?.qr_code_base64,
    });
  } catch (error: any) {
    console.error("Erro ao processar pagamento:", error);

    return NextResponse.json(
      {
        error: "Erro ao processar pagamento.",
        details: error?.message || "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
