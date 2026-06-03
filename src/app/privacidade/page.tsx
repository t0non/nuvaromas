'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, Share2, Key } from 'lucide-react';

export default function PoliticaPrivacidade() {
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
            Política de Privacidade
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
              <ShieldCheck className="w-5 h-5 text-[#B298ED]" /> Compromisso com a Privacidade
            </h2>
            <p>
              A NUV Aromas tem o compromisso de proteger a privacidade e os dados pessoais de nossos clientes. Esta Política de Privacidade descreve, de forma clara e em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)</strong>, como coletamos, armazenamos, tratamos e protegemos suas informações de compra e navegação.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-plus-jakarta-sans text-xl font-bold text-texto-escuro flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#B298ED]" /> 1. Quais dados coletamos?
            </h2>
            <p>
              Para processar seus pedidos e oferecer uma experiência de compra ágil, coletamos os seguintes dados:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Dados Cadastrais:</strong> Nome completo, endereço de e-mail e número de telefone (WhatsApp).</li>
              <li><strong>Dados de Entrega:</strong> Endereço residencial em Belo Horizonte ou região (rua, número, bairro, CEP).</li>
              <li><strong>Dados de Transação:</strong> Detalhes dos produtos comprados, valores e status de pagamento (as informações de cartão de crédito não são armazenadas diretamente em nossos servidores, sendo tratadas de forma criptografada por intermediadores de pagamento homologados).</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-plus-jakarta-sans text-xl font-bold text-texto-escuro flex items-center gap-2">
              <Share2 className="w-5 h-5 text-[#B298ED]" /> 2. Finalidade e Compartilhamento
            </h2>
            <p>
              Os seus dados são tratados exclusivamente para viabilizar as transações comerciais na loja. O compartilhamento ocorre apenas quando indispensável para a prestação do serviço:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Logística:</strong> Endereço compartilhado com motoboys ou transportadoras parceiras responsáveis pela entrega.</li>
              <li><strong>Pagamentos:</strong> Processamento de transações junto às gateways e integradoras de Pix e cartões.</li>
              <li><strong>Suporte:</strong> Uso de e-mail ou telefone para responder a solicitações de suporte ou atualizações do pedido.</li>
            </ul>
            <p>
              <em>* Nunca comercializamos ou cedemos seus dados pessoais a terceiros para fins de marketing.</em>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-plus-jakarta-sans text-xl font-bold text-texto-escuro flex items-center gap-2">
              <Key className="w-5 h-5 text-[#B298ED]" /> 3. Seus Direitos (LGPD)
            </h2>
            <p>
              De acordo com a LGPD, você possui total controle sobre seus dados e pode, a qualquer momento, entrar em contato conosco pelo e-mail <strong>contato@nuvaromas.site</strong> para:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Confirmar a existência de tratamento e acessar seus dados cadastrados.</li>
              <li>Solicitar a correção de dados incompletos ou inexatos.</li>
              <li>Solicitar a exclusão definitiva de seus dados pessoais dos nossos registros (salvo quando o armazenamento for exigido por obrigação fiscal ou legal).</li>
            </ul>
          </section>

        </motion.div>

      </div>
    </div>
  );
}
