'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, QrCode, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function PoliticaReembolso() {
  return (
    <div className="min-h-screen bg-off-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#B298ED]"
          >
            Políticas da Loja
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-plus-jakarta-sans text-4xl md:text-5xl font-bold text-deep-purple mt-3 tracking-tight"
          >
            Política de Reembolso
          </motion.h1>
        </div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 md:p-12 border border-cinza-suave/50 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-8 text-texto-escuro/80 text-base leading-relaxed"
        >
          
          <section className="space-y-4">
            <h2 className="font-plus-jakarta-sans text-xl font-bold text-texto-escuro flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#B298ED]" /> Elegibilidade para Reembolso
            </h2>
            <p>
              O reembolso de valores pagos na NUV Aromas ocorre sob as seguintes circunstâncias:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Exercício do direito de arrependimento (solicitado em até 7 dias corridos após o recebimento).</li>
              <li>Aprovação da devolução de produtos defeituosos ou avariados após análise.</li>
              <li>Cancelamento do pedido solicitado antes do despacho das mercadorias.</li>
            </ul>
            <p>
              Todo reembolso está sujeito à análise prévia das condições dos itens devolvidos em nosso centro de distribuição, de acordo com a nossa <strong>Política de Trocas e Devoluções</strong>.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="font-plus-jakarta-sans text-xl font-bold text-texto-escuro">
              Prazos e Métodos de Estorno
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#FAF8F6] p-6 rounded-2xl border border-cinza-suave/50 space-y-3">
                <h3 className="font-plus-jakarta-sans font-bold text-sm text-texto-escuro flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-[#B298ED]" /> Pagamento via Pix
                </h3>
                <p className="text-xs text-texto-escuro/70 leading-relaxed">
                  O reembolso será feito diretamente na mesma conta bancária associada à chave Pix utilizada para efetuar o pagamento.
                </p>
                <p className="text-xs font-bold text-deep-purple">
                  Prazo: Até 3 (três) dias úteis após a aprovação da devolução.
                </p>
              </div>

              <div className="bg-[#FAF8F6] p-6 rounded-2xl border border-cinza-suave/50 space-y-3">
                <h3 className="font-plus-jakarta-sans font-bold text-sm text-texto-escuro flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#B298ED]" /> Pagamento via Cartão
                </h3>
                <p className="text-xs text-texto-escuro/70 leading-relaxed">
                  Solicitaremos o estorno do valor pago junto ao intermediador de pagamento. O lançamento do crédito na fatura é efetuado pelo seu banco emissor.
                </p>
                <p className="text-xs font-bold text-deep-purple">
                  Prazo: Estorno processado em 5 dias úteis. O crédito na fatura pode levar de 1 a 2 faturas para constar.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-plus-jakarta-sans text-xl font-bold text-texto-escuro flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#B298ED]" /> Recusa de Reembolso
            </h2>
            <p>
              A NUV Aromas reserva-se o direito de recusar a emissão do reembolso e devolver o produto ao remetente caso:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>O produto apresente qualquer indício de queima, uso ou remoção de lacres.</li>
              <li>O produto seja enviado incompleto ou fora de sua embalagem original avariada.</li>
              <li>A solicitação de devolução tenha ocorrido fora dos prazos de arrependimento regulamentares.</li>
            </ul>
          </section>

        </motion.div>

      </div>
    </div>
  );
}
