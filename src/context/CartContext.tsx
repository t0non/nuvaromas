'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  aroma: string;
  qty: number;
  imgUrl: string;
  img: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any, aroma: string, qty: number) => void;
  updateCartQty: (id: number, aroma: string, delta: number) => void;
  removeFromCart: (id: number, aroma: string) => void;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('nuv_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart data from localStorage', e);
      }
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem('nuv_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any, aroma: string, qty: number) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === product.id && item.aroma === aroma);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].qty += qty;
        return updated;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          priceNum: product.priceNum,
          aroma,
          qty,
          imgUrl: product.imgUrl,
          img: product.img,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (id: number, aroma: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.aroma === aroma) {
            const newQty = item.qty + delta;
            return { ...item, qty: newQty };
          }
          return item;
        })
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id: number, aroma: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.aroma === aroma)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.priceNum * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
