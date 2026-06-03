'use client';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function OrderSuccess() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl shadow-xl border border-cinza-suave/40">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
        <h1 className="font-plus-jakarta-sans text-3xl font-bold text-deep-purple">Pedido Confirmado!</h1>
        <p className="text-texto-escuro/70">
          Seu pagamento foi aprovado com sucesso. Você receberá um e-mail com os detalhes e atualizações do seu pedido.
        </p>
        <div className="pt-4">
          <Link href="/" className="inline-block bg-[#B298ED] hover:bg-[#A385E0] text-white font-bold py-3 px-8 rounded-full uppercase tracking-widest text-sm transition-all shadow-lg">
            Voltar para a Loja
          </Link>
        </div>
      </div>
    </div>
  );
}
