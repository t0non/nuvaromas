'use client';

import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateCartQty, removeFromCart, cartTotal } = useCart();
  const router = useRouter();

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsCartOpen(false)} 
              className="fixed inset-0 bg-texto-escuro/20 backdrop-blur-sm z-50" 
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }} 
              className="fixed top-0 right-0 w-full max-w-md h-full bg-off-white z-50 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 flex justify-between items-center border-b border-cinza-suave">
                <h2 className="font-plus-jakarta-sans text-xl font-bold">Seu Carrinho</h2>
                <button onClick={() => setIsCartOpen(false)} aria-label="Fechar Carrinho">
                  <X className="w-6 h-6" strokeWidth={1.5} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-center">
                    <p className="text-texto-escuro/50 font-medium">Seu carrinho está vazio.<br/>Comece seu ritual de bem-estar.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.aroma}`} className="flex items-center gap-4 pb-6 border-b border-cinza-suave/50">
                        <div className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 ${item.img} bg-[#F3EDE8] border border-cinza-suave/30`}>
                          {item.imgUrl ? (
                            <img src={item.imgUrl} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center opacity-40">
                              <span className="text-[8px] uppercase tracking-widest">NUV</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-plus-jakarta-sans font-bold text-sm text-texto-escuro truncate">{item.name}</h4>
                          <p className="text-xs text-[#B298ED] font-semibold mt-0.5">{item.aroma}</p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2.5 border border-cinza-suave rounded-full px-2 py-1 bg-white">
                              <button onClick={() => updateCartQty(item.id, item.aroma, -1)} className="p-0.5 hover:text-deep-purple"><Minus className="w-3.5 h-3.5" /></button>
                              <span className="text-xs font-semibold w-4 text-center">{item.qty}</span>
                              <button onClick={() => updateCartQty(item.id, item.aroma, 1)} className="p-0.5 hover:text-deep-purple"><Plus className="w-3.5 h-3.5" /></button>
                            </div>
                            <button onClick={() => removeFromCart(item.id, item.aroma)} className="text-texto-escuro/40 hover:text-red-500 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-plus-jakarta-sans font-bold text-sm text-deep-purple">R$ {(item.priceNum * item.qty).toFixed(2).replace('.', ',')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer / Subtotal */}
              {cart.length > 0 && (
               <div className="p-6 border-t border-cinza-suave bg-white">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-medium text-texto-escuro/60">Subtotal</span>
                    <span className="font-plus-jakarta-sans font-bold text-xl text-deep-purple">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      router.push('/checkout');
                    }}
                    className="w-full bg-[#B298ED] hover:bg-[#A385E0] text-white font-bold py-4 rounded-full text-xs uppercase tracking-widest transition-all shadow-[0_8px_30px_rgba(178,152,237,0.3)]"
                  >
                    Finalizar Compra
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
