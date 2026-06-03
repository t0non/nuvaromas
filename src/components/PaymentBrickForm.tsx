'use client';

import React, { useState, useEffect } from 'react';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function PaymentBrickForm() {
  const [isReady, setIsReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Pegando os dados do carrinho real
  const { cart, cartTotal } = useCart();

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;
    if (publicKey) {
      initMercadoPago(publicKey, { locale: 'pt-BR' });
      setIsReady(true);
    } else {
      setErrorMessage('Chave pública do Mercado Pago não configurada.');
    }
  }, []);

  // Se o carrinho estiver vazio ou não carregado, usar um valor mínimo para não quebrar o SDK, 
  // mas o ideal é redirecionar de volta para a loja.
  const amount = cartTotal > 0 ? cartTotal : 99.9;

  const initialization = {
    amount: amount, 
    preferenceId: undefined, // Opcional
  };

  const customization = {
    paymentMethods: {
      creditCard: 'all',
      debitCard: 'all',
      ticket: 'all',
      bankTransfer: 'all',
      mercadoPago: 'all',
    },
    visual: {
      style: {
        theme: 'default' as const,
      },
    },
  };

  const onSubmit = async (formData: any) => {
    setErrorMessage(null);

    return new Promise<void>((resolve, reject) => {
      // Mock de customer e shipping (num cenário real, você coletaria isso num passo antes do brick)
      const customer = {
        name: "Comprador Nuv Aromas",
        email: formData.payer?.email || "comprador@email.com",
        phone: "11999999999",
        document: formData.payer?.identification?.number || "00000000000"
      };

      const shipping = {
        zipcode: "00000-000",
        street: "Rua Exemplo",
        number: "123",
        city: "São Paulo",
        state: "SP"
      };

      fetch('/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          cart,
          customer,
          shipping,
          cartTotal
        }),
      })
        .then(async (response) => {
          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.error || result.details || 'Erro desconhecido no servidor');
          }
          return result;
        })
        .then((result) => {
          if (result.status === 'approved') {
            window.location.href = `/pedido/sucesso?order=${result.order_id}`;
            resolve();
          } else if (result.status === 'in_process' || result.status === 'pending') {
            if (result.qr_code) {
              sessionStorage.setItem('pix_qr_code', result.qr_code);
              sessionStorage.setItem('pix_qr_code_base64', result.qr_code_base64);
            }
            window.location.href = `/pedido/pendente?order=${result.order_id}`;
            resolve();
          } else {
            setErrorMessage(`Pagamento não aprovado. Motivo: ${result.status_detail}`);
            reject();
          }
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage('Ocorreu um erro ao processar o pagamento no servidor.');
          reject();
        });
    });
  };

  const onError = async (error: any) => {
    console.error(error);
    setErrorMessage('Ocorreu um erro interno no Payment Brick.');
  };

  const onReady = async () => {
    console.log('Payment Brick is ready');
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-cinza-suave/40 overflow-hidden">
      {/* Header Visual */}
      <div className="bg-gradient-to-r from-deep-purple/10 to-lavanda-clara/20 p-6 md:p-8 border-b border-cinza-suave/40 text-center">
        <h3 className="font-plus-jakarta-sans text-2xl font-bold text-texto-escuro">
          Checkout Seguro
        </h3>
        <p className="text-sm text-texto-escuro/60 mt-1">
          Finalize seu pedido com segurança usando Mercado Pago
        </p>
      </div>

      <div className="p-6 md:p-8 space-y-5">
        {/* Alerts for feedback */}
        {errorMessage && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm animate-fadeIn">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Dynamic Cart Details Summary */}
        <div className="bg-[#FAF8F6] rounded-2xl border border-cinza-suave/50 p-4 mb-6">
          <h4 className="font-bold text-sm text-texto-escuro mb-3">Resumo do Pedido</h4>
          {cart.map((item, idx) => (
             <div key={idx} className="flex justify-between items-center text-xs text-texto-escuro/60 mb-2 pb-2 border-b border-cinza-suave/40">
               <span>{item.qty}x {item.name} ({item.aroma})</span>
               <span className="font-semibold text-texto-escuro">R$ {item.priceNum * item.qty},00</span>
             </div>
          ))}
          <div className="flex justify-between items-center text-sm font-bold text-texto-escuro pt-1">
            <span>Valor Total</span>
            <span className="text-deep-purple text-base">R$ {cartTotal},00</span>
          </div>
        </div>

        {isReady ? (
          <div className="mt-6">
            <Payment
              initialization={initialization}
              customization={customization as any}
              onSubmit={onSubmit}
              onReady={onReady}
              onError={onError}
            />
          </div>
        ) : (
          <div className="text-center p-8 text-cinza-suave">
            Carregando checkout seguro...
          </div>
        )}
      </div>
    </div>
  );
}
