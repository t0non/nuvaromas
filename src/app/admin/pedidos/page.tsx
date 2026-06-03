'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, ExternalLink } from 'lucide-react';

export default function AdminPedidos() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    // Puxa os pedidos mais recentes primeiro
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  }

  function getStatusBadge(status: string) {
    if (status === 'approved') return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">Aprovado</span>;
    if (status === 'created' || status === 'pending' || status === 'in_process') return <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">Pendente</span>;
    if (status === 'rejected' || status === 'cancelled') return <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold">Cancelado</span>;
    return <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-semibold">{status}</span>;
  }

  function getPaymentMethod(method: string) {
    if (method === 'pix') return 'Pix';
    if (method === 'bolbradesco') return 'Boleto';
    if (method?.includes('master') || method?.includes('visa')) return 'Cartão';
    return method;
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-white flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900 font-plus-jakarta-sans">Gestão de Pedidos</h1>
          <button onClick={fetchOrders} className="text-[#B298ED] hover:text-[#A385E0] text-sm font-semibold transition-colors">
            Atualizar Tabela
          </button>
        </div>

        <div className="p-0">
          {loading ? (
            <div className="flex justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#B298ED]" />
            </div>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              Nenhum pedido encontrado.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-400 font-semibold">
                  <tr>
                    <th className="px-6 py-4">ID do Pedido</th>
                    <th className="px-6 py-4">Data</th>
                    <th className="px-6 py-4">Cliente</th>
                    <th className="px-6 py-4">Método</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Valor Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => {
                    const date = new Date(order.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit' });
                    return (
                      <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs text-gray-500 truncate max-w-[120px]" title={order.id}>
                          {order.id.split('-')[0]}...
                        </td>
                        <td className="px-6 py-4 text-gray-500">{date}</td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-900">{order.customer_name}</p>
                          <p className="text-xs text-gray-400">{order.customer_email}</p>
                        </td>
                        <td className="px-6 py-4 capitalize">{getPaymentMethod(order.payment_method)}</td>
                        <td className="px-6 py-4">
                          {getStatusBadge(order.payment_status)}
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-gray-900">
                          R$ {Number(order.total_amount).toFixed(2).replace('.', ',')}
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
