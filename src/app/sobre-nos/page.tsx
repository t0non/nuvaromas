'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ShieldCheck } from 'lucide-react';

export default function SobreNos() {
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
            Nossa História
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-plus-jakarta-sans text-4xl md:text-5xl font-bold text-deep-purple mt-3 tracking-tight"
          >
            Sobre a NUV Aromas
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
              <Sparkles className="w-5 h-5 text-[#B298ED]" /> O Refúgio em Seu Lar
            </h2>
            <p>
              A <strong>NUV Aromas</strong> é uma marca brasileira de bem-estar focada em criar rituais de conforto, aconchego e relaxamento para a sua casa. Acreditamos que o lar deve ser um refúgio da rotina acelerada do dia a dia — um espaço onde você possa respirar fundo, desacelerar e recarregar suas energias.
            </p>
            <p>
              Nossa marca não vende apenas produtos de aromaterapia. Vendemos a sensação acolhedora de chegar em casa após um longo dia, acender uma vela e transformar o ambiente em um santuário pessoal de paz.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-plus-jakarta-sans text-xl font-bold text-texto-escuro flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#B298ED]" /> Produção Artesanal e Consciência
            </h2>
            <p>
              Nossos produtos são desenvolvidos de maneira meticulosa e sustentável. Nossas <strong>velas aromáticas</strong> são produzidas artesanalmente com cera vegetal pura e pavios de algodão, garantindo uma queima limpa e sem toxinas. Nossos <strong>óleos essenciais</strong> são selecionados por sua pureza e qualidade, ideais para uso em difusores e umidificadores ultrassônicos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-plus-jakarta-sans text-xl font-bold text-texto-escuro flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#B298ED]" /> Transparência e Atendimento
            </h2>
            <p>
              Somos uma loja online brasileira sediada em <strong>Belo Horizonte, Minas Gerais</strong>. Atendemos com foco na região de BH, oferecendo entregas locais ágeis para garantir que sua experiência de bem-estar comece o mais rápido possível.
            </p>
            <p className="bg-[#FAF8F6] p-4 rounded-2xl border border-cinza-suave/30 text-sm text-texto-escuro/60 italic">
              <strong>Nota comercial importante:</strong> A NUV Aromas opera exclusivamente como e-commerce online, com envio de pedidos diretamente de nosso centro de distribuição. Não dispomos de loja física de atendimento ao público. Todo o nosso atendimento é feito online através de nossos canais digitais dedicados (WhatsApp e e-mail).
            </p>
          </section>
        </motion.div>

      </div>
    </div>
  );
}
