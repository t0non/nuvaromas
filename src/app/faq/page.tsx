'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    {
      q: "O que é a NUV Aromas?",
      a: "A NUV Aromas é uma marca brasileira de bem-estar focada na criação de velas aromáticas artesanais e óleos essenciais puros. Nosso objetivo é transformar pequenos momentos diários em rituais de relaxamento, descanso e conforto no lar."
    },
    {
      q: "A NUV Aromas tem loja física?",
      a: "Não. A NUV Aromas opera exclusivamente como loja online (e-commerce). Todos os pedidos são enviados do nosso centro de distribuição diretamente para o endereço de nossos clientes. Não realizamos atendimento presencial ao público no local."
    },
    {
      q: "Onde a NUV Aromas entrega?",
      a: "Atendemos de forma expressa e dedicada toda a cidade de Belo Horizonte (MG) e região metropolitana próxima. Também realizamos envios regionais seguros de acordo com a disponibilidade informada no checkout."
    },
    {
      q: "Como funciona a entrega em BH?",
      a: "Para Belo Horizonte, oferecemos entregas locais via motoboy (flat rate de R$ 15,00) com prazo ágil de até 1 a 2 dias úteis após a confirmação do pagamento, além de envios adicionais via transportadora ou Correios."
    },
    {
      q: "Quais produtos a NUV Aromas vende?",
      a: "Trabalhamos exclusivamente com uma linha selecionada de velas aromáticas produzidas com cera vegetal pura e óleos essenciais puros de alta concentração, desenvolvidos para criar atmosferas confortáveis em casa."
    },
    {
      q: "Como comprar no site?",
      a: "Basta escolher os seus produtos favoritos, definir a fragrância e a quantidade desejada, clicar em 'COMPRAR' para adicioná-los à sacola de compras, clicar em 'Finalizar Compra', preencher seus dados de envio fictícios na simulação de checkout e confirmar o pedido."
    },
    {
      q: "Quais formas de pagamento são aceitas?",
      a: "Em nosso simulador, aceitamos pagamentos via Pix (com geração de QR Code e código copia e cola) e cartões de crédito simulados das principais bandeiras (Visa, Mastercard, Elo, Amex)."
    },
    {
      q: "Posso trocar ou devolver um produto?",
      a: "Sim. De acordo com o CDC brasileiro, você tem até 7 dias corridos após o recebimento para solicitar a devolução gratuita de qualquer item por arrependimento, contanto que o produto esteja sem uso e em sua embalagem original lacrada."
    },
    {
      q: "Como falar com a NUV Aromas?",
      a: "Nosso atendimento é realizado de forma online. Você pode entrar em contato com o suporte enviando um e-mail para contato@nuvaromas.site ou diretamente pelo WhatsApp (31) 99938-4130 de segunda a sexta, das 09h às 18h."
    },
    {
      q: "Os produtos têm pronta entrega?",
      a: "Sim, todos os itens anunciados no nosso catálogo do e-commerce possuem pronta entrega e são separados em nosso centro de distribuição logo após a aprovação do seu pagamento."
    },
    {
      q: "Como usar vela aromática com segurança?",
      a: "Sempre queime a vela em superfícies planas, resistentes ao calor e longe de objetos inflamáveis (como cortinas). Nunca deixe a vela acesa sem supervisão direta e mantenha-a fora do alcance de crianças e animais de estimação. Apague a vela antes de ir dormir."
    },
    {
      q: "Como usar óleo essencial no umidificador?",
      a: "Adicione de 5 a 10 gotas do seu óleo essencial NUV Aromas favorito na água do seu difusor ou umidificador ultrassônico. O aparelho criará uma névoa fina aromática que ajuda a deixar o ambiente mais perfumado e acolhedor."
    },
    {
      q: "Qual produto escolher para deixar a casa cheirosa?",
      a: "Para salas de estar e quartos, as velas aromáticas criam uma queima aconchegante e fragrância duradoura. Para espaços de trabalho ou uso contínuo, a difusão de óleos essenciais cítricos ou herbais (como Alecrim ou Capim-Limão) traz frescor e foco."
    },
    {
      q: "Os produtos servem para presente?",
      a: "Sim! Nossos produtos são embalados individualmente com embalagens e recipientes de design minimalista e sofisticado, tornando as velas e essências excelentes opções de presentes elegantes de bem-estar."
    }
  ];

  return (
    <div className="min-h-screen bg-off-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Schema FAQPage JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqItems.map((item) => ({
                "@type": "Question",
                "name": item.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.a
                }
              }))
            })
          }}
        />

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#B298ED]"
          >
            Suporte e Dúvidas
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-plus-jakarta-sans text-4xl md:text-5xl font-bold text-deep-purple mt-3 tracking-tight"
          >
            Perguntas Frequentes
          </motion.h1>
          <p className="mt-4 text-texto-escuro/60 text-sm max-w-md mx-auto">
            Dúvidas sobre entregas, pagamentos e cuidados com velas e essências NUV.
          </p>
        </div>

        {/* FAQ Accordion Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-cinza-suave/50 shadow-[0_8px_30px_rgba(0,0,0,0.01)] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-plus-jakarta-sans text-sm md:text-base font-bold text-texto-escuro flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[#B298ED] flex-shrink-0" />
                    {item.q}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#B298ED]/10 flex items-center justify-center text-deep-purple flex-shrink-0">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-5 pt-1 text-sm text-texto-escuro/70 leading-relaxed border-t border-cinza-suave/30">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
}
