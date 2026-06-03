'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, FileText, Camera, ShieldCheck } from 'lucide-react';

export default function TrocasDevolucoes() {
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
            Política de Trocas e Devoluções
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
              <RefreshCw className="w-5 h-5 text-[#B298ED]" /> Direito de Arrependimento (7 dias)
            </h2>
            <p>
              Em conformidade com o Artigo 49 do Código de Defesa do Consumidor (CDC) brasileiro, o cliente dispõe de até <strong>7 (sete) dias corridos</strong>, contados a partir da data de recebimento do pedido, para manifestar arrependimento da compra e solicitar a devolução dos itens.
            </p>
            <p>
              Os custos de frete para a primeira devolução baseada em arrependimento dentro deste prazo legal são inteiramente cobertos pela NUV Aromas.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-plus-jakarta-sans text-xl font-bold text-texto-escuro flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#B298ED]" /> Condições dos Produtos para Devolução
            </h2>
            <p>
              Para que a devolução ou troca seja aprovada por nossa equipe de controle de qualidade, os produtos devolvidos devem obrigatoriamente cumprir as seguintes exigências:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>O produto deve estar <strong>totalmente sem indícios de uso</strong>. No caso de velas aromáticas, o pavio não deve ter sido aceso. No caso de óleos essenciais, o lacre do frasco deve estar intacto.</li>
              <li>O produto deve ser devolvido em sua embalagem original completa, sem avarias ou rasgos.</li>
              <li>Todos os acessórios, manuais ou brindes integrados ao pedido devem retornar junto com o produto.</li>
            </ul>
            <p className="bg-red-50 p-4 rounded-xl border border-red-100 text-xs text-red-700">
              ⚠️ <strong>Importante:</strong> Produtos que apresentarem indícios de uso, queima, abertura de lacre ou danos decorrentes de mau manuseio pelo comprador não serão aceitos e serão reenviados ao endereço original de entrega mediante pagamento do respectivo frete.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-plus-jakarta-sans text-xl font-bold text-texto-escuro flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#B298ED]" /> Avarias, Defeitos ou Pedidos Divergentes
            </h2>
            <p>
              Se ao receber o pedido você constatar que a embalagem estava violada, que o produto sofreu avarias no transporte (como vidro quebrado) ou que recebeu um produto diferente do comprado, siga os passos abaixo:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Tire fotos e/ou grave um vídeo nítido demonstrando a avaria constatada, o produto e a etiqueta da caixa de postagem.</li>
              <li>Entre em contato imediatamente por WhatsApp <strong>(31) 99938-4130</strong> ou pelo e-mail <strong>contato@nuvaromas.site</strong> em até 2 dias após a entrega.</li>
              <li>Nossa equipe providenciará o reenvio sem custos do produto correto ou a substituição do item danificado após a triagem rápida do material enviado.</li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="font-plus-jakarta-sans text-xl font-bold text-texto-escuro flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#B298ED]" /> Procedimento e Prazos de Análise
            </h2>
            <p>
              Ao solicitar a troca ou devolução, nossa equipe fornecerá um código de autorização de postagem dos Correios ou combinará a retirada local por motoboy (para clientes residentes em Belo Horizonte).
            </p>
            <p>
              Após a chegada dos produtos em nosso centro de distribuição, reservamos o prazo de até <strong>5 (cinco) dias úteis</strong> para realizar a análise das condições dos itens. Uma vez aprovada, prosseguiremos com a emissão do cupom de troca ou o estorno dos valores de acordo com a nossa <strong>Política de Reembolso</strong>.
            </p>
          </section>

        </motion.div>

      </div>
    </div>
  );
}
