'use client';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function OrderError() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl shadow-xl border border-cinza-suave/40">
        <XCircle className="w-20 h-20 text-red-500 mx-auto" />
        <h1 className="font-plus-jakarta-sans text-3xl font-bold text-deep-purple">Pagamento Recusado</h1>
        <p className="text-texto-escuro/70">
          Infelizmente não conseguimos processar o pagamento do seu pedido. Verifique os dados do cartão ou tente outro método de pagamento.
        </p>
        <div className="pt-4">
          <Link href="/checkout" className="inline-block bg-[#B298ED] hover:bg-[#A385E0] text-white font-bold py-3 px-8 rounded-full uppercase tracking-widest text-sm transition-all shadow-lg">
            Tentar Novamente
          </Link>
        </div>
      </div>
    </div>
  );
}
