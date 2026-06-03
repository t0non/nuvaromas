'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, MapPin, AlertCircle } from 'lucide-react';

export default function PoliticaEnvio() {
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
            Política de Envio e Entrega
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
              <Truck className="w-5 h-5 text-[#B298ED]" /> Informações Gerais de Envio
            </h2>
            <p>
              A NUV Aromas opera com entregas locais ágeis focadas em <strong>Belo Horizonte e Região Metropolitana</strong>. Todas as nossas entregas são efetuadas por parceiros logísticos confiáveis, serviços de motoboy expressos ou transportadoras selecionadas para assegurar a integridade dos seus rituais de bem-estar.
            </p>
            <p>
              O processamento do pedido é iniciado imediatamente após a confirmação do pagamento. O faturamento e separação dos produtos em estoque são concluídos em até 24 horas úteis.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-plus-jakarta-sans text-xl font-bold text-texto-escuro flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#B298ED]" /> Prazos Estimados
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Belo Horizonte (Zona Urbana):</strong> Entrega via motoboy em até 1 a 2 dias úteis após a confirmação do pagamento.</li>
              <li><strong>Região Metropolitana de BH:</strong> Envio em até 3 dias úteis.</li>
              <li><strong>Outras Regiões (MG):</strong> De 3 a 7 dias úteis, conforme modalidade selecionada no checkout.</li>
            </ul>
            <p className="text-xs text-texto-escuro/50 italic">
              * Nota: Os prazos de entrega informados são estimativas geradas pelos transportadores e contam a partir da data de postagem do produto.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-plus-jakarta-sans text-xl font-bold text-texto-escuro flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#B298ED]" /> Taxas e Regiões Atendidas
            </h2>
            <p>
              As taxas de entrega variam conforme a distância e a modalidade selecionada no carrinho de compras. A estimativa exata do valor de frete é exibida antes da etapa de pagamento final:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Motoboy Express (BH Central):</strong> R$ 15,00 taxa fixa.</li>
              <li><strong>Correios (PAC/Sedex) / Transportadora local:</strong> R$ 22,00 taxa fixa promocional para as demais regiões integradas.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-plus-jakarta-sans text-xl font-bold text-texto-escuro flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#B298ED]" /> Endereço Incorreto e Tentativas de Entrega
            </h2>
            <p>
              <strong>Endereço Incompleto ou Incorreto:</strong> A digitação correta do endereço de entrega é de inteira responsabilidade do comprador. Caso o pedido seja devolvido por endereço insuficiente ou divergente, entraremos em contato para coletar os dados corretos e realizar um novo envio, cuja nova taxa de frete será cobrada do cliente.
            </p>
            <p>
              <strong>Ausência no Local de Entrega:</strong> Para entregas via motoboy, o entregador entrará em contato por telefone/WhatsApp no local. Caso não seja atendido e não haja ninguém autorizado a receber, o pedido retornará ao centro de distribuição. Realizaremos até 2 tentativas adicionais combinadas; falhas subsequentes exigirão o pagamento de uma nova taxa de envio.
            </p>
          </section>

        </motion.div>

      </div>
    </div>
  );
}
