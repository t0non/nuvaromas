'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Mail, Phone } from 'lucide-react';

export default function AdminClientes() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClientes();
  }, []);

  async function fetchClientes() {
    setLoading(true);
    
    try {
      const response = await fetch('/api/admin/customers');
      if (!response.ok) throw new Error('Failed to fetch customers');
      const data = await response.json();
      
      const map = new Map();
      data.forEach((order: any) => {
        if (!order.customer_email) return;
        if (!map.has(order.customer_email)) {
          map.set(order.customer_email, {
            email: order.customer_email,
            name: order.customer_name || 'Sem nome',
            phone: order.customer_phone || '',
            totalSpent: 0,
            ordersCount: 0,
            lastOrder: order.created_at,
          };
        }
        acc[email].totalSpent += Number(order.total_amount);
        acc[email].ordersCount += 1;
        // Atualiza para o nome/telefone mais recente
        if (new Date(order.created_at) > new Date(acc[email].lastOrder)) {
          acc[email].name = order.customer_name;
          acc[email].phone = order.customer_phone;
          acc[email].lastOrder = order.created_at;
        }
        return acc;
      }, {});

      // Converte o objeto de volta para array
      const clientesArray = Object.values(grouped).sort((a: any, b: any) => b.totalSpent - a.totalSpent);
      setClientes(clientesArray);
    }
    setLoading(false);
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-white flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900 font-plus-jakarta-sans">Diretório de Clientes</h1>
          <p className="text-sm text-gray-500">Baseado no histórico de compras</p>
        </div>

        <div className="p-0">
          {loading ? (
            <div className="flex justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#B298ED]" />
            </div>
          ) : clientes.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              Nenhum cliente registrado ainda.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-400 font-semibold">
                  <tr>
                    <th className="px-6 py-4">Cliente</th>
                    <th className="px-6 py-4">Contato</th>
                    <th className="px-6 py-4">Nº Pedidos</th>
                    <th className="px-6 py-4">Última Compra</th>
                    <th className="px-6 py-4 text-right">Total Gasto (LTV)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {clientes.map((cliente, idx) => {
                    const lastDate = new Date(cliente.lastOrder).toLocaleDateString('pt-BR');
                    return (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-900">{cliente.name}</p>
                        </td>
                        <td className="px-6 py-4 space-y-1">
                          <p className="flex items-center gap-2 text-xs text-gray-500"><Mail className="w-3 h-3"/> {cliente.email}</p>
                          {cliente.phone && <p className="flex items-center gap-2 text-xs text-gray-500"><Phone className="w-3 h-3"/> {cliente.phone}</p>}
                        </td>
                        <td className="px-6 py-4 font-bold text-[#B298ED]">{cliente.ordersCount}</td>
                        <td className="px-6 py-4 text-gray-500">{lastDate}</td>
                        <td className="px-6 py-4 text-right font-bold text-gray-900">
                          R$ {cliente.totalSpent.toFixed(2).replace('.', ',')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
