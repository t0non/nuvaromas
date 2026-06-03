'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ShieldAlert, BadgeInfo, Scale } from 'lucide-react';

export default function TermosUso() {
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
            Termos de Uso do Site
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
              <FileText className="w-5 h-5 text-[#B298ED]" /> 1. Aceitação dos Termos
            </h2>
            <p>
              Ao navegar e efetuar compras no e-commerce da NUV Aromas (`nuvaromas.site`), você concorda integralmente com estes Termos de Uso. Caso não concorde com qualquer uma das condições estabelecidas, recomendamos não prosseguir com a navegação ou aquisição de produtos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-plus-jakarta-sans text-xl font-bold text-texto-escuro flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#B298ED]" /> 2. Responsabilidades do Cliente
            </h2>
            <p>
              O cliente é exclusivamente responsável pela precisão e atualidade de todos os dados informados no momento do cadastro e preenchimento de endereço para envio em Belo Horizonte e região. A NUV Aromas não se responsabiliza por falhas de entrega decorrentes de cadastros errôneos, incompletos ou dados falsos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-plus-jakarta-sans text-xl font-bold text-texto-escuro flex items-center gap-2">
              <BadgeInfo className="w-5 h-5 text-[#B298ED]" /> 3. Preços, Estoque e Imagens
            </h2>
            <p>
              <strong>Preços e Estoques:</strong> A NUV Aromas reserva-se o direito de ajustar preços e disponibilidade de estoque dos produtos (velas aromáticas e óleos essenciais) sem aviso prévio. Caso um pedido seja feito e o produto não esteja mais disponível por erro de inventário, faremos o contato imediato para devolução integral do valor ou troca por similar.
            </p>
            <p>
              <strong>Imagens dos Produtos:</strong> As imagens exibidas no site são produzidas de forma artística para representar as dimensões e características reais dos produtos da melhor maneira possível. Entretanto, pequenas variações de cores e texturas podem ocorrer por se tratarem de ceras e essências artesanais ou devido às configurações de calibração de cada tela.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-plus-jakarta-sans text-xl font-bold text-texto-escuro flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#B298ED]" /> 4. Propriedade Intelectual
            </h2>
            <p>
              Todo o conteúdo deste site, incluindo a marca "NUV Aromas", logotipos, textos explicativos, descrições de rituais de bem-estar, esquemas de fragrâncias e fotos, pertence exclusivamente à NUV Aromas. Qualquer reprodução, distribuição ou utilização não autorizada do material intelectual constitui violação de direitos autorais e de propriedade industrial.
            </p>
          </section>

        </motion.div>

      </div>
    </div>
  );
}
