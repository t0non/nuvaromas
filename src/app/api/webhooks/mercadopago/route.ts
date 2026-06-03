import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { supabase } from "@/lib/supabase";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || '',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Mercado Pago manda o ID no body.data.id para novos webhooks
    // E no body.resource para notificações IPN mais antigas
    const paymentId = body?.data?.id || body?.resource?.split("/")?.pop();
    const type = body?.type || body?.topic;

    if (!paymentId || !String(type).includes("payment")) {
      return NextResponse.json({ received: true });
    }

    // Consulta os detalhes reais do pagamento diretamente na API do MP
    // para evitar fraudes onde enviam um payload falso para o nosso webhook
    const payment = new Payment(client);
    const paymentData = await payment.get({ id: paymentId });

    const orderId = paymentData.external_reference;
    const status = paymentData.status;
    const statusDetail = paymentData.status_detail;

    if (orderId) {
      // 1. Atualiza o status do pedido no banco de dados
      const { error } = await supabase
        .from('orders')
        .update({
          mercado_pago_payment_id: String(paymentData.id),
          payment_status: status,
          mercado_pago_status_detail: statusDetail,
          updated_at: new Date().toISOString(),
        })
        .eq('id', orderId);

      if (error) {
        console.error("Erro ao atualizar o banco de dados pelo webhook:", error);
      }

      // 2. Lógica pós-pagamento
      if (status === 'approved') {
        // Exemplo: Buscar itens do pedido para baixar estoque
        // const { data: items } = await supabase.from('order_items').select('*').eq('order_id', orderId);
        // Implementar lógica de baixa de estoque e envio de e-mail de confirmação
        console.log(`[WEBHOOK] Pagamento Aprovado para o pedido ${orderId}`);
      } else if (status === 'rejected') {
        console.log(`[WEBHOOK] Pagamento Recusado para o pedido ${orderId}`);
      } else {
        console.log(`[WEBHOOK] Status Atualizado: ${status} para o pedido ${orderId}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erro processando webhook do Mercado Pago:", error);
    // Sempre retornar 200/201 para o webhook, senão o MP fica reenviando
    return NextResponse.json({ received: true });
  }
}
