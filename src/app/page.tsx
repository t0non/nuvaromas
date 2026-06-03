'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Moon, Star, Sparkles, ChevronRight, ArrowRight, ShieldCheck, Plus, Minus, Volume2, VolumeX, Play, Pause, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function NuvPremiumLanding() {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [selectedAroma, setSelectedAroma] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };



  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const categories = [
    { name: 'Velas Aromáticas', img: 'bg-creme', imgUrl: '/vela_lavanda_calma.png?v=1' },
    { name: 'Óleos Essenciais', img: 'bg-lavanda-clara', imgUrl: '/oleo_essencia_lavanda.png?v=1' }
  ];

  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [essentialOils, setEssentialOils] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  React.useEffect(() => {
    async function loadProducts() {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await supabase.from('products').select('*').eq('is_active', true).order('created_at', { ascending: true });
      
      if (data) {
        // Separa os produtos em Velas e Óleos baseando-se no nome
        const velas = data.filter(p => p.name.toLowerCase().includes('vela')).map(p => ({
          ...p,
          priceNum: Number(p.price),
          price: `R$ ${Number(p.price).toFixed(2).replace('.', ',')}`,
          desc: p.description,
          imgUrl: p.image_url,
          aromas: p.aromas ? p.aromas.split(',') : ['Original'],
          // Mantendo uma galeria básica gerada a partir da foto principal para não quebrar o layout
          gallery: [
            { type: 'image', url: p.image_url },
            { type: 'concept', title: p.aromas, subtitle: 'Aroma relaxante e envolvente.' },
            { type: 'image', url: p.image_url }
          ]
        }));

        const oleos = data.filter(p => p.name.toLowerCase().includes('óleo') || p.name.toLowerCase().includes('oleo')).map(p => ({
          ...p,
          priceNum: Number(p.price),
          price: `R$ ${Number(p.price).toFixed(2).replace('.', ',')}`,
          desc: p.description,
          imgUrl: p.image_url,
          aromas: p.aromas ? p.aromas.split(',') : ['Original'],
          gallery: [
            { type: 'image', url: p.image_url },
            { type: 'concept', title: p.aromas, subtitle: '100% puro e natural.' },
            { type: 'image', url: p.image_url }
          ]
        }));

        setFeaturedProducts(velas);
        setEssentialOils(oleos);
      }
      setLoadingProducts(false);
    }
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-off-white text-texto-escuro font-inter overflow-x-hidden">
      


      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 md:pt-20 px-6 overflow-hidden flex flex-col justify-start md:justify-center bg-[url('/background_sessao1.png?v=2')] bg-cover bg-[position:75%_center] md:bg-center bg-no-repeat">
        <div className="max-w-7xl mx-auto w-full relative z-10 flex">
          <motion.div 
            initial="hidden" animate="visible" variants={fadeIn}
            className="max-w-xl text-left"
          >
            <h1 className="font-plus-jakarta-sans text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              Seus momentos,<br />mais leves.
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-inter font-normal leading-relaxed mb-10 max-w-md">
              Aromas, conforto e bem-estar para transformar sua rotina. Velas aromáticas e óleos essenciais com entrega em Belo Horizonte.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <button onClick={() => document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' })} className="group w-full sm:w-auto px-9 py-4 bg-[#B298ED] text-white rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#A385E0] transition-all duration-300 shadow-[0_8px_30px_rgba(178,152,237,0.3)] hover:shadow-[0_12px_35px_rgba(178,152,237,0.5)] hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-3">
                <span>ver produtos</span>
                <div className="transform transition-transform duration-300 group-hover:translate-x-1 flex items-center">
                  <Image src="/logo_nuv.png" alt="NUV Logo" width={36} height={15} className="h-3.5 w-auto object-contain" />
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-24 bg-white border-y border-cinza-suave/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center"
          >
            {[
              {
                icon: (
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="#B298ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                text: 'Relaxamento diário'
              },
              {
                icon: (
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C12 2 8 7 8 12a4 4 0 0 0 8 0c0-5-4-10-4-10z" stroke="#B298ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.5 9.5C6.5 10.5 5 12.5 5 15a7 7 0 0 0 14 0c0-2.5-1.5-4.5-3.5-5.5" stroke="#B298ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                text: 'Aromas naturais'
              },
              {
                icon: (
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 7A5 5 0 0 0 7 7c0 3 2 6 5 9 3-3 5-6 5-9z" stroke="#B298ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 20h18" stroke="#B298ED" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M9 20c0-1.5 1-3 3-3s3 1.5 3 3" stroke="#B298ED" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ),
                text: 'Sono mais confortável'
              },
              {
                icon: (
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#B298ED" strokeWidth="1.5"/>
                    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#B298ED" strokeWidth="1.5"/>
                    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#B298ED" strokeWidth="1.5"/>
                    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#B298ED" strokeWidth="1.5"/>
                  </svg>
                ),
                text: 'Design para sua casa'
              },
            ].map((benefit, idx) => (
              <motion.div key={idx} variants={fadeIn} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-[#B298ED]/10 rounded-2xl flex items-center justify-center mb-5 border border-[#B298ED]/20">
                  {benefit.icon}
                </div>
                <p className="font-plus-jakarta-sans font-bold text-[#252525] text-sm tracking-wide">{benefit.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Mini VSL Video (Custom Clean Player) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-cinza-suave/30 bg-[#252525] relative aspect-video cursor-pointer group flex justify-center items-center"
            onClick={togglePlay}
          >
            <video 
              ref={videoRef}
              src="/mini_vsl.mp4" 
              autoPlay 
              loop 
              muted={isMuted} 
              playsInline 
              className="w-full h-full object-cover"
            />
            
            {/* Custom Translucent Controls Overlay */}
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              
              {/* Floating Play/Pause indicator */}
              <div 
                className={`w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 shadow-lg transition-all duration-300 ${
                  isPlaying ? 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100' : 'opacity-100 scale-100'
                }`}
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current translate-x-0.5" />}
              </div>

              {/* Mute Button (Bottom Right) */}
              <button 
                onClick={toggleMute}
                className="absolute bottom-6 right-6 w-11 h-11 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 shadow-md transition-all active:scale-95 z-20"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Seção Entrega em BH e Região */}
      <section className="py-24 bg-white border-b border-cinza-suave/30">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#B298ED] block mb-2">Comodidade local</span>
            <h2 className="font-plus-jakarta-sans text-3xl font-bold text-deep-purple mb-4">Entrega em BH e Região</h2>
            <p className="text-base text-texto-escuro/70 leading-relaxed max-w-2xl mx-auto">
              A NUV Aromas atende online e realiza entregas em Belo Horizonte e região. O prazo e a taxa de entrega podem variar conforme o endereço informado no pedido. Em caso de dúvidas, fale conosco pelo WhatsApp antes de finalizar sua compra.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Seção Por que comprar na NUV Aromas */}
      <section className="py-24 bg-off-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#B298ED] block mb-2">Qualidade e Compromisso</span>
            <h2 className="font-plus-jakarta-sans text-3xl font-bold text-deep-purple">Por que comprar na NUV Aromas?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-cinza-suave/50 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#B298ED]/10 flex items-center justify-center text-deep-purple mx-auto">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-plus-jakarta-sans font-bold text-base text-texto-escuro">Cera Vegetal Pura</h3>
              <p className="text-xs text-texto-escuro/60 leading-relaxed">
                Nossas velas são produzidas de forma artesanal com ceras 100% vegetais e livre de parafinas, promovendo uma queima limpa que ajuda a criar uma sensação de relaxamento.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-cinza-suave/50 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#B298ED]/10 flex items-center justify-center text-deep-purple mx-auto">
                <Wind className="w-5 h-5" />
              </div>
              <h3 className="font-plus-jakarta-sans font-bold text-base text-texto-escuro">Óleos Essenciais Puros</h3>
              <p className="text-xs text-texto-escuro/60 leading-relaxed">
                Essências puras e concentradas, livres de aditivos industriais químicos. Ideais para difusão ultrassônica e deixar o ambiente mais acolhedor.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-cinza-suave/50 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#B298ED]/10 flex items-center justify-center text-deep-purple mx-auto">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-plus-jakarta-sans font-bold text-base text-texto-escuro">Transparência Comercial</h3>
              <p className="text-xs text-texto-escuro/60 leading-relaxed">
                Informações comerciais claras, políticas de entrega e suporte 100% humanizado via WhatsApp para contribuir para uma rotina de compra mais calma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section id="categorias" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mb-16">
            <h2 className="font-plus-jakarta-sans text-3xl md:text-4xl font-bold text-deep-purple tracking-tight mb-4">Essenciais NUV</h2>
            <p className="text-texto-escuro/60">Tudo para o seu momento de paz.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat, idx) => (
              <motion.div 
                key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-video cursor-pointer ${cat.img}`}
              >
                {cat.imgUrl ? (
                  <img 
                    src={cat.imgUrl} 
                    alt={cat.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-cinza-suave/50 text-xs tracking-widest uppercase">Foto Categoria</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-500 z-10" />
                <div className="absolute bottom-0 left-0 p-8 z-20 flex items-center justify-between w-full">
                  <h3 className={`font-plus-jakarta-sans text-2xl font-bold ${cat.imgUrl ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]' : 'text-deep-purple'}`}>{cat.name}</h3>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 shadow-sm z-20">
                    <ArrowRight className="w-4 h-4 text-deep-purple" strokeWidth={2} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Storytelling - Ritual NUV */}
      <section id="rituais" className="py-24 bg-creme overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden relative bg-cinza-suave flex items-center justify-center"
          >
            <p className="text-texto-escuro/30 text-sm tracking-widest uppercase">Imagem Lifestyle 50%</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <h2 className="font-plus-jakarta-sans text-4xl md:text-5xl font-bold text-deep-purple tracking-tight mb-8 leading-tight">
              Cada aroma <br/>conta uma história.
            </h2>
            <p className="text-lg text-texto-escuro/70 leading-relaxed mb-10 font-normal">
              Produzidas artesanalmente em Belo Horizonte, nossas velas aromáticas e óleos essenciais puros são criados para transformar seus pequenos momentos diários em verdadeiros rituais de bem-estar. Acender uma vela de cera vegetal ou usar nossas essências é o primeiro passo para o seu relaxamento em BH.
            </p>
            <button className="flex items-center gap-2 text-deep-purple font-semibold hover:gap-4 transition-all">
              Conheça a nossa história <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section id="produtos" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="flex justify-between items-end mb-16">
            <div>
              <h2 className="font-plus-jakarta-sans text-3xl font-bold text-deep-purple tracking-tight mb-2">Nossas Velas Perfumadas</h2>
              <p className="text-texto-escuro/60">Feitas com cera vegetal pura e aromas que abraçam.</p>
            </div>
            <a href="#" className="hidden md:flex items-center text-sm font-semibold text-lavanda hover:text-deep-purple transition-colors">
              Ver todas <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-8">
            {featuredProducts.map((prod, idx) => (
              <motion.div 
                key={prod.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="group flex flex-col items-center text-center cursor-pointer"
                onClick={() => {
                  setSelectedProduct(prod);
                  setSelectedAroma(prod.aromas[0]);
                  setQuantity(1);
                  setActiveSlide(0);
                }}
              >
                {/* Image Container */}
                <div className="aspect-[4/3] w-full rounded-md bg-[#F3EDE8] mb-4 relative overflow-hidden">
                  {prod.imgUrl ? (
                    <img 
                      src={prod.imgUrl} 
                      alt={prod.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-50">
                      <span className="text-[10px] tracking-widest uppercase text-texto-escuro/50">NUV</span>
                    </div>
                  )}
                </div>
                
                {/* Title */}
                <h3 className="font-plus-jakarta-sans font-bold text-texto-escuro text-sm md:text-base leading-tight mb-2 min-h-[44px] flex items-center justify-center px-1">
                  {prod.name}
                </h3>
                
                {/* Price */}
                <p className="font-bold text-texto-escuro text-sm md:text-base mb-4">{prod.price}</p>
                
                {/* Flat Comprar Button */}
                <button className="w-full py-3 bg-[#F3EDE8] hover:bg-[#B298ED] hover:text-white text-texto-escuro font-bold text-xs uppercase tracking-widest transition-all duration-300 rounded-sm">
                  COMPRAR
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Óleos Essenciais */}
      <section id="oleos" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mb-16 flex justify-between items-end">
            <div>
              <h2 className="font-plus-jakarta-sans text-3xl font-bold text-deep-purple tracking-tight mb-2">Óleos Essenciais Puros</h2>
              <p className="text-texto-escuro/60">100% naturais para purificar e elevar o clima da sua casa.</p>
            </div>
            <a href="#" className="hidden md:flex items-center text-sm font-semibold text-lavanda hover:text-deep-purple transition-colors">
              Ver todos <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-8">
            {essentialOils.map((prod, idx) => (
              <motion.div 
                key={prod.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="group flex flex-col items-center text-center cursor-pointer"
                onClick={() => {
                  setSelectedProduct(prod);
                  setSelectedAroma(prod.aromas[0]);
                  setQuantity(1);
                  setActiveSlide(0);
                }}
              >
                {/* Image Container */}
                <div className="aspect-[4/3] w-full rounded-md bg-[#E9E6E3] mb-4 relative overflow-hidden">
                  {prod.imgUrl ? (
                    <img 
                      src={prod.imgUrl} 
                      alt={prod.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-50">
                      <span className="text-[10px] tracking-widest uppercase text-texto-escuro/50">NUV</span>
                    </div>
                  )}
                </div>
                
                {/* Title */}
                <h3 className="font-plus-jakarta-sans font-bold text-texto-escuro text-sm md:text-base leading-tight mb-2 min-h-[44px] flex items-center justify-center px-1">
                  {prod.name}
                </h3>
                
                {/* Price */}
                <p className="font-bold text-texto-escuro text-sm md:text-base mb-4">{prod.price}</p>
                
                {/* Flat Comprar Button */}
                <button className="w-full py-3 bg-[#F3EDE8] hover:bg-[#B298ED] hover:text-white text-texto-escuro font-bold text-xs uppercase tracking-widest transition-all duration-300 rounded-sm">
                  COMPRAR
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Avaliações Apple Style */}
      <section className="py-24 bg-white border-t border-cinza-suave/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
            <h2 className="font-plus-jakarta-sans text-3xl font-bold text-deep-purple tracking-tight mb-4">Experiências NUV</h2>
            <div className="flex items-center justify-center gap-1 text-deep-purple mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" strokeWidth={1} />)}
            </div>
            <p className="text-texto-escuro/60 text-sm">Baseado em +1.200 avaliações de clientes.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: "Uma atmosfera de spa em casa. A vela de lavanda tem uma queima super limpa e o cheiro fica por horas. A embalagem é um luxo à parte.", a: "Isabella M." },
              { t: "O umidificador NUV Cloud mudou minhas noites. É muito silencioso e o design minimalista combinou perfeitamente com a decoração do meu quarto.", a: "Thiago P." },
              { t: "Comprei o kit de óleos essenciais e a qualidade é indiscutível. Dá pra sentir que são puros. Uso o de bambu para trabalhar e lavanda para dormir.", a: "Camila R." }
            ].map((review, idx) => (
              <motion.div 
                key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="bg-off-white rounded-2xl p-8 border border-cinza-suave/50 flex flex-col justify-between hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow"
              >
                <div>
                  <div className="flex gap-1 text-lavanda mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" strokeWidth={1} />)}
                  </div>
                  <p className="text-texto-escuro/80 text-[15px] leading-relaxed mb-8">"{review.t}"</p>
                </div>
                <p className="font-medium text-sm text-deep-purple flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-lavanda" strokeWidth={1.5} /> {review.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-32 bg-lavanda-clara/30">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="font-plus-jakarta-sans text-3xl md:text-4xl font-bold text-deep-purple tracking-tight mb-4">
              Ganhe 10% OFF na primeira compra.
            </h2>
            <p className="text-texto-escuro/70 mb-10">
              Junte-se ao nosso clube exclusivo e receba dicas de bem-estar, acesso antecipado a lançamentos e ofertas especiais.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="flex-1 bg-white border border-cinza-suave rounded-full px-6 py-4 focus:outline-none focus:border-lavanda focus:ring-1 focus:ring-lavanda transition-all"
              />
              <button type="submit" className="bg-deep-purple text-white px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all">
                Assinar
              </button>
            </form>
          </motion.div>
        </div>
      </section>


      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedProduct(null)} 
              className="fixed inset-0 bg-texto-escuro/40 backdrop-blur-sm z-50"
            />
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed inset-x-4 bottom-4 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-5xl w-full bg-off-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
            >
              {/* Product Gallery Section (Left) */}
              <div className="w-full md:w-3/5 bg-white p-6 flex flex-col-reverse md:flex-row gap-4 relative">
                {/* Thumbnails (Vertical on desktop, horizontal on mobile) */}
                <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible md:overflow-y-auto flex-shrink-0 py-1">
                  {selectedProduct.gallery?.map((slide: any, sIdx: number) => (
                    <button
                      key={sIdx}
                      onClick={() => setActiveSlide(sIdx)}
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border flex-shrink-0 transition-all ${
                        activeSlide === sIdx 
                          ? 'border-2 border-[#B298ED] ring-2 ring-[#B298ED]/20 scale-95 shadow-sm' 
                          : 'border-cinza-suave hover:border-[#B298ED]'
                      }`}
                    >
                      {slide.type === 'image' && slide.url ? (
                        <img src={slide.url} alt="" className="w-full h-full object-cover" />
                      ) : slide.type === 'concept' ? (
                        <div className="w-full h-full bg-gradient-to-br from-[#FAF8F6] to-[#E9E6E3] flex flex-col items-center justify-center p-1 text-center">
                          <span className="text-[8px] font-bold text-texto-escuro leading-none truncate w-full">Floral</span>
                          <span className="text-[6px] text-texto-escuro/60 mt-0.5">Conceito</span>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#c2e9fb] to-[#a1c4fd] flex flex-col items-center justify-center p-1 text-center">
                          <span className="text-[8px] font-bold text-texto-escuro leading-none truncate w-full">Notas</span>
                          <span className="text-[6px] text-texto-escuro/60 mt-0.5">Pirâmide</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Active Slide Display */}
                <div className="flex-1 aspect-[4/3] md:aspect-square relative rounded-2xl overflow-hidden bg-creme flex items-center justify-center min-h-[300px]">
                  {selectedProduct.gallery?.[activeSlide]?.type === 'image' ? (
                    <img 
                      src={selectedProduct.gallery[activeSlide].url} 
                      alt={selectedProduct.name} 
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                  ) : selectedProduct.gallery?.[activeSlide]?.type === 'concept' ? (
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-8 bg-[#E9E6E3] text-center">
                      <h4 className="font-plus-jakarta-sans text-[10px] font-bold tracking-[0.25em] uppercase text-texto-escuro/50 mb-3">Conceito Olfativo</h4>
                      <h3 className="font-plus-jakarta-sans text-3xl font-bold text-deep-purple leading-tight mb-4">{selectedProduct.gallery[activeSlide].title}</h3>
                      <p className="text-sm md:text-base text-texto-escuro/70 leading-relaxed max-w-md">{selectedProduct.gallery[activeSlide].subtitle}</p>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12 bg-gradient-to-br from-[#c2e9fb] to-[#a1c4fd] text-texto-escuro">
                      <h4 className="font-plus-jakarta-sans text-[10px] font-bold tracking-[0.25em] uppercase text-texto-escuro/50 mb-6 text-center">Pirâmide Olfativa</h4>
                      <div className="space-y-4 max-w-md mx-auto w-full">
                        <div className="border-l-2 border-[#B298ED]/40 pl-4">
                          <h5 className="font-plus-jakarta-sans font-bold text-[11px] uppercase tracking-wider text-deep-purple mb-0.5">Notas de topo</h5>
                          <p className="text-xs md:text-sm opacity-80 leading-relaxed">{selectedProduct.gallery?.[activeSlide]?.topo}</p>
                        </div>
                        <div className="border-l-2 border-[#B298ED]/40 pl-4">
                          <h5 className="font-plus-jakarta-sans font-bold text-[11px] uppercase tracking-wider text-deep-purple mb-0.5">Notas de coração</h5>
                          <p className="text-xs md:text-sm opacity-80 leading-relaxed">{selectedProduct.gallery?.[activeSlide]?.coracao}</p>
                        </div>
                        <div className="border-l-2 border-[#B298ED]/40 pl-4">
                          <h5 className="font-plus-jakarta-sans font-bold text-[11px] uppercase tracking-wider text-deep-purple mb-0.5">Notas de base</h5>
                          <p className="text-xs md:text-sm opacity-80 leading-relaxed">{selectedProduct.gallery?.[activeSlide]?.base}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Close button for Mobile */}
                  <button 
                    onClick={() => setSelectedProduct(null)} 
                    className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur rounded-full text-texto-escuro hover:bg-white md:hidden transition-colors shadow-sm z-30"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Product Details Section (Right) */}
              <div className="w-full md:w-2/5 p-8 flex flex-col justify-between bg-off-white border-t md:border-t-0 md:border-l border-cinza-suave/30 overflow-y-auto">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-plus-jakarta-sans text-2xl font-bold text-texto-escuro leading-tight mb-1">{selectedProduct.name}</h3>
                      <span className="text-[10px] uppercase tracking-widest text-[#B298ED] font-bold">Original NUV</span>
                    </div>
                    <button 
                      onClick={() => setSelectedProduct(null)} 
                      className="p-1 text-texto-escuro/40 hover:text-texto-escuro hidden md:block transition-colors"
                    >
                      <X className="w-6 h-6" strokeWidth={1.5} />
                    </button>
                  </div>
                  <p className="text-2xl font-plus-jakarta-sans font-bold text-deep-purple mb-6">{selectedProduct.price}</p>
                  <p className="text-sm text-texto-escuro/60 leading-relaxed mb-6">{selectedProduct.desc}</p>
                  
                  {/* Informações detalhadas compatíveis com GMC */}
                  <div className="space-y-4 mb-6 text-xs text-texto-escuro/70 border-y border-cinza-suave/30 py-4">
                    <div className="flex justify-between">
                      <span className="font-bold text-texto-escuro">Marca:</span>
                      <span>NUV Aromas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-texto-escuro">Disponibilidade:</span>
                      <span className="text-green-600 font-bold">✓ Em estoque</span>
                    </div>
                    <div>
                      <span className="font-bold text-texto-escuro block mb-1">Benefícios:</span>
                      <ul className="list-disc pl-4 space-y-1 mt-1 text-[11px] text-texto-escuro/60">
                        {selectedProduct.id <= 4 ? (
                          <>
                            <li>Ajuda a deixar o ambiente mais perfumado</li>
                            <li>Cria uma sensação de aconchego e conforto em casa</li>
                            <li>Pavio de algodão e queima limpa</li>
                          </>
                        ) : (
                          <>
                            <li>100% puro e natural</li>
                            <li>Ajuda a criar uma sensação de relaxamento</li>
                            <li>Ideal para difusão ultrassônica no umidificador</li>
                          </>
                        )}
                      </ul>
                    </div>
                    <div>
                      <span className="font-bold text-texto-escuro block mb-1">Modo de Uso & Cuidados:</span>
                      <p className="mt-1 text-[11px] leading-relaxed text-texto-escuro/60">
                        {selectedProduct.id <= 4 
                          ? "Acenda em superfície estável e resistente ao calor. Nunca deixe acesa sem supervisão. Mantenha longe de cortinas, pets e crianças. Apague antes de dormir."
                          : "Adicione de 5 a 10 gotas na água do seu difusor ultrassônico. Não ingerir. Evite contato com a pele/olhos. Mantenha em local seco e fresco."}
                      </p>
                    </div>
                    <div>
                      <span className="font-bold text-texto-escuro block mb-1">Entrega & Devoluções:</span>
                      <p className="mt-1 text-[11px] leading-relaxed text-texto-escuro/60">
                        Entrega local expressa em Belo Horizonte (1-2 dias úteis, taxa de R$ 15,00). Garantia de devolução gratuita por arrependimento em até 7 dias úteis após recebimento. Veja nossa <a href="/politica-envio" target="_blank" className="text-[#B298ED] hover:underline font-semibold">Política de Envio</a> e <a href="/trocas-devolucoes" target="_blank" className="text-[#B298ED] hover:underline font-semibold">Trocas</a>.
                      </p>
                    </div>
                  </div>

                  {/* Aroma Selection */}
                  <div className="mb-6">
                    <span className="text-xs uppercase tracking-wider font-bold text-texto-escuro/80 block mb-3">Escolha a Opção / Aroma</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.aromas.map((aroma: string) => (
                        <button
                          key={aroma}
                          onClick={() => setSelectedAroma(aroma)}
                          className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide border transition-all ${
                            selectedAroma === aroma
                              ? 'bg-[#B298ED] text-white border-[#B298ED] shadow-sm'
                              : 'bg-white text-texto-escuro/80 border-cinza-suave hover:border-lavanda'
                          }`}
                        >
                          {aroma}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity selector */}
                  <div className="mb-8">
                    <span className="text-xs uppercase tracking-wider font-bold text-texto-escuro/80 block mb-3">Quantidade</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-4 border border-cinza-suave rounded-full px-4 py-2 bg-white">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="hover:text-deep-purple p-1"><Minus className="w-4 h-4" /></button>
                        <span className="text-sm font-bold w-6 text-center">{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)} className="hover:text-deep-purple p-1"><Plus className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => addToCart(selectedProduct, selectedAroma, quantity)}
                  className="w-full bg-[#B298ED] hover:bg-[#A385E0] text-white font-bold py-4 rounded-full text-xs uppercase tracking-[0.2em] transition-all shadow-[0_8px_30px_rgba(178,152,237,0.3)] hover:scale-[1.01] active:scale-[0.99] mt-4"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Widget */}
      <a
        href="https://wa.me/5531999384130?text=Olá!%20Estava%20navegando%20no%20site%20da%20NUV%20Aromas%20e%20gostaria%20de%20saber%20mais%20sobre%20as%20velas%20e%20óleos%20essenciais."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 bg-[#25D366] text-white p-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[200px] transition-all duration-500 ease-out font-plus-jakarta-sans text-[11px] font-bold uppercase tracking-wider pl-0 group-hover:pl-1">
          Fale Conosco
        </span>
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.292 1.503 4.904 1.505 5.482.002 9.944-4.416 9.947-9.848.001-2.632-1.021-5.105-2.879-6.967C16.805 2.022 14.336 1 11.71 1c-5.485 0-9.948 4.414-9.95 9.847-.002 1.776.477 3.514 1.39 5.027l-.95 3.473 3.557-.933zm11.397-6.945c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        </svg>
      </a>
    </div>
  );
}
