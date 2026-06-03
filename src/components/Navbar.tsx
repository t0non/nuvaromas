'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, setIsCartOpen } = useCart();

  const cartQty = cart.reduce((acc, item) => acc + item.qty, 0);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Velas', href: '/#produtos' },
    { name: 'Óleos', href: '/#oleos' },
    { name: 'Sobre Nós', href: '/sobre-nos' },
    { name: 'Contato', href: '/contato' },
    { name: 'FAQ', href: '/faq' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#B298ED] border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Mobile menu toggle */}
        <div className="flex md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 -ml-2 text-white" aria-label="Menu">
            {isMenuOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
          </button>
        </div>
        
        {/* Logo */}
        <div className="flex-1 md:flex-none flex justify-center md:justify-start">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo_nuv.png" 
              alt="NUV Aromas Logo" 
              width={140} 
              height={56} 
              className="h-11 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex flex-1 justify-center space-x-8">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="font-plus-jakarta-sans text-[13px] font-bold tracking-[0.15em] uppercase text-white/90 hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex justify-end items-center space-x-4">
          <Link href="/contato" className="p-2 text-white hover:text-white/80 transition-colors hidden md:block" aria-label="Área do Cliente">
            <User className="w-5 h-5" strokeWidth={1.5} />
          </Link>
          <button 
            onClick={() => setIsCartOpen(true)} 
            className="p-2 relative text-white hover:text-white/80 transition-colors"
            aria-label="Carrinho"
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            {cartQty > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-deep-purple font-bold text-[9px] rounded-full flex items-center justify-center shadow-sm">
                {cartQty}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-off-white border-b border-cinza-suave overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className="font-plus-jakarta-sans text-sm font-bold tracking-[0.15em] uppercase text-texto-escuro hover:text-deep-purple transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
