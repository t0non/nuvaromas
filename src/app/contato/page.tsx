'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Clock, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contato() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    // Simulate contact submission
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-off-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#B298ED]"
          >
            Fale Conosco
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-plus-jakarta-sans text-4xl md:text-5xl font-bold text-deep-purple mt-3 tracking-tight"
          >
            Canais de Atendimento
          </motion.h1>
          <p className="mt-4 text-texto-escuro/60 max-w-xl mx-auto text-sm md:text-base">
            Atendemos online pelo WhatsApp e entregamos em Belo Horizonte e região. Para dúvidas sobre produtos, pedidos, prazos ou trocas, fale com a nossa equipe pelos canais abaixo.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          
          {/* Col 1: Contact Details */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="bg-white rounded-3xl p-6 border border-cinza-suave/50 shadow-[0_8px_30px_rgba(0,0,0,0.01)] space-y-6">
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#B298ED]/10 flex items-center justify-center text-deep-purple flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-plus-jakarta-sans font-bold text-xs uppercase tracking-wider text-texto-escuro/50 mb-1">WhatsApp de Suporte</h4>
                  <a href="https://wa.me/5531999384130" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-deep-purple hover:underline">
                    (31) 99938-4130
                  </a>
                  <p className="text-xs text-texto-escuro/40 mt-1">Resposta rápida para rituais e pedidos.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#B298ED]/10 flex items-center justify-center text-deep-purple flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-plus-jakarta-sans font-bold text-xs uppercase tracking-wider text-texto-escuro/50 mb-1">E-mail Comercial</h4>
                  <a href="mailto:contato@nuvaromas.site" className="text-sm font-semibold text-deep-purple hover:underline">
                    contato@nuvaromas.site
                  </a>
                  <p className="text-xs text-texto-escuro/40 mt-1">Para dúvidas institucionais ou corporativas.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#B298ED]/10 flex items-center justify-center text-deep-purple flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-plus-jakarta-sans font-bold text-xs uppercase tracking-wider text-texto-escuro/50 mb-1">Horário de Atendimento</h4>
                  <p className="text-sm font-semibold text-texto-escuro">Segunda a Sexta: 09:00 às 18:00</p>
                  <p className="text-xs text-texto-escuro/40 mt-1">Sábados, domingos e feriados: fechado.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#B298ED]/10 flex items-center justify-center text-deep-purple flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-plus-jakarta-sans font-bold text-xs uppercase tracking-wider text-texto-escuro/50 mb-1">Área Atendida</h4>
                  <p className="text-sm font-semibold text-texto-escuro">Belo Horizonte e Região</p>
                  <p className="text-xs text-texto-escuro/40 mt-1">Envios locais via motoboy e logística regional.</p>
                </div>
              </div>

            </div>

            <div className="bg-[#B298ED]/10 rounded-2xl p-6 border border-[#B298ED]/20 text-xs text-deep-purple/80 leading-relaxed text-center font-medium">
              💡 **Dica:** O suporte via WhatsApp é ideal para agilizar trocas ou tirar dúvidas sobre fragrâncias em tempo real!
            </div>
          </motion.div>

          {/* Col 2: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-3 bg-white rounded-3xl p-6 md:p-8 border border-cinza-suave/50 shadow-[0_8px_30px_rgba(0,0,0,0.02)]"
          >
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-plus-jakarta-sans text-xl font-bold text-texto-escuro">Mensagem Enviada!</h3>
                <p className="text-sm text-texto-escuro/60 max-w-sm mx-auto">Agradecemos o contato. Nossa equipe responderá sua mensagem por e-mail em até 24 horas úteis.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-[#B298ED] hover:bg-[#A385E0] text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all mt-4"
                >
                  Enviar Outra Mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-plus-jakarta-sans text-lg font-bold text-texto-escuro mb-4">Envie uma Mensagem</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-texto-escuro/60 mb-2">Nome Completo *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name} 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                      placeholder="Ex: Pedro Silva" 
                      className="w-full bg-white border border-cinza-suave rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-lavanda"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-texto-escuro/60 mb-2">E-mail para Retorno *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email} 
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                      placeholder="Ex: pedro@email.com" 
                      className="w-full bg-white border border-cinza-suave rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-lavanda"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-texto-escuro/60 mb-2">Assunto</label>
                  <input 
                    type="text" 
                    value={formData.subject} 
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })} 
                    placeholder="Ex: Dúvida sobre velas personalizadas" 
                    className="w-full bg-white border border-cinza-suave rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-lavanda"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-texto-escuro/60 mb-2">Sua Mensagem *</label>
                  <textarea 
                    required
                    rows={5}
                    value={formData.message} 
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                    placeholder="Escreva aqui suas dúvidas ou sugestões..." 
                    className="w-full bg-white border border-cinza-suave rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-lavanda resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#B298ED] hover:bg-[#A385E0] text-white font-bold py-4 rounded-full text-xs uppercase tracking-[0.2em] transition-all shadow-[0_8px_30px_rgba(178,152,237,0.3)] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Enviar Mensagem
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </div>
  );
}
