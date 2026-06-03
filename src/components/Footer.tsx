'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#B298ED] text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Col 1: About and Trust */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/logo_nuv.png" 
                alt="NUV Logo" 
                width={160} 
                height={64} 
                className="h-14 w-auto object-contain" 
              />
            </Link>
            <p className="text-white/80 text-sm max-w-sm leading-relaxed mb-6">
              NUV Aromas é uma marca de bem-estar para casa, focada em aromas, conforto e rituais de relaxamento. Criamos produtos artesanais com cera vegetal pura e óleos essenciais para transformar sua rotina.
            </p>
            <div className="space-y-2">
              <p className="text-white/80 text-xs font-semibold uppercase tracking-wider">Segurança</p>
              <p className="text-white/70 text-xs flex items-center gap-1.5">
                <span>🔒</span> Conexão Criptografada SSL | Site 100% Seguro
              </p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">Explorar</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-white/80 hover:text-white text-sm transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/#produtos" className="text-white/80 hover:text-white text-sm transition-colors">Velas Aromáticas</Link>
              </li>
              <li>
                <Link href="/#oleos" className="text-white/80 hover:text-white text-sm transition-colors">Óleos Essenciais</Link>
              </li>
              <li>
                <Link href="/sobre-nos" className="text-white/80 hover:text-white text-sm transition-colors">Sobre Nós</Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/80 hover:text-white text-sm transition-colors">Perguntas Frequentes (FAQ)</Link>
              </li>
              <li>
                <Link href="/contato" className="text-white/80 hover:text-white text-sm transition-colors">Contato</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Policy Links */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">Políticas e Termos</h4>
            <ul className="space-y-4 font-medium">
              <li>
                <Link href="/politica-envio" className="text-white/80 hover:text-white text-sm transition-colors">Política de Envio e Entrega</Link>
              </li>
              <li>
                <Link href="/trocas-devolucoes" className="text-white/80 hover:text-white text-sm transition-colors">Trocas e Devoluções</Link>
              </li>
              <li>
                <Link href="/reembolso" className="text-white/80 hover:text-white text-sm transition-colors">Política de Reembolso</Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-white/80 hover:text-white text-sm transition-colors">Política de Privacidade</Link>
              </li>
              <li>
                <Link href="/termos-uso" className="text-white/80 hover:text-white text-sm transition-colors">Termos de Uso</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods and Copyright */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-white/60 text-xs text-center md:text-left">
              &copy; {currentYear} NUV Aromas. Todos os direitos reservados.
            </p>
            <p className="text-white/40 text-[10px] text-center md:text-left leading-relaxed">
              NUV AROMAS | nuvaromas.site | Savassi, Belo Horizonte - MG | Atendimento online: contato@nuvaromas.site
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2.5">
            <p className="text-white/80 text-[10px] font-bold uppercase tracking-wider">Formas de Pagamento Aceitas</p>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <span className="text-[10px] font-bold text-white/90">PIX</span>
              <div className="w-[1px] h-3 bg-white/20" />
              <span className="text-[10px] font-bold text-white/90">CARTÃO (VISA, MASTERCARD, ELO, AMEX)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
