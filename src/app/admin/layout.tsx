'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, ShoppingBag, Users, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Se estiver na tela de login, não mostra o menu
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const tabs = [
    { name: 'Produtos', href: '/admin', icon: Package },
    { name: 'Pedidos', href: '/admin/pedidos', icon: ShoppingBag },
    { name: 'Clientes', href: '/admin/clientes', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="font-plus-jakarta-sans font-bold text-xl text-deep-purple tracking-tight">
                NUV Admin
              </div>
              <div className="hidden md:flex items-center gap-2">
                {tabs.map((tab) => {
                  const isActive = pathname === tab.href;
                  const Icon = tab.icon;
                  return (
                    <Link 
                      key={tab.name}
                      href={tab.href}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive 
                          ? 'bg-[#B298ED]/10 text-[#B298ED]' 
                          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            
            <a href="/" target="_blank" className="text-sm font-medium text-gray-500 hover:text-deep-purple transition-colors flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Ver Loja
            </a>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
