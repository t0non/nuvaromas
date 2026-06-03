'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Check, Edit2, Loader2, Save, X } from 'lucide-react';

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ price: 0, is_active: true });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: true });
    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  }

  function startEditing(product: any) {
    setEditingId(product.id);
    setEditForm({ price: product.price, is_active: product.is_active });
  }

  async function saveProduct(id: string) {
    setSaving(true);
    const { error } = await supabase
      .from('products')
      .update({ price: editForm.price, is_active: editForm.is_active })
      .eq('id', id);
    
    setSaving(false);
    if (!error) {
      setEditingId(null);
      fetchProducts();
    } else {
      alert('Erro ao salvar produto!');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-deep-purple flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white font-plus-jakarta-sans">Painel de Produtos</h1>
          <button onClick={fetchProducts} className="text-white/80 hover:text-white text-sm">Atualizar</button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#B298ED]" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-texto-escuro">
                <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold">
                  <tr>
                    <th className="px-6 py-4">Produto</th>
                    <th className="px-6 py-4">Aroma</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Preço (R$)</th>
                    <th className="px-6 py-4 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium flex items-center gap-3">
                        <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
                        {p.name}
                      </td>
                      <td className="px-6 py-4 text-gray-500">{p.aromas}</td>
                      <td className="px-6 py-4">
                        {editingId === p.id ? (
                          <select 
                            value={editForm.is_active ? 'true' : 'false'}
                            onChange={(e) => setEditForm({...editForm, is_active: e.target.value === 'true'})}
                            className="bg-white border border-gray-300 text-sm rounded-lg p-2 focus:ring-[#B298ED] focus:border-[#B298ED]"
                          >
                            <option value="true">Ativo</option>
                            <option value="false">Pausado</option>
                          </select>
                        ) : (
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {p.is_active ? 'Ativo' : 'Pausado'}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-bold">
                        {editingId === p.id ? (
                          <div className="flex items-center gap-2">
                            <span>R$</span>
                            <input 
                              type="number" 
                              step="0.01"
                              value={editForm.price}
                              onChange={(e) => setEditForm({...editForm, price: parseFloat(e.target.value)})}
                              className="w-24 bg-white border border-gray-300 text-sm rounded-lg p-2 focus:ring-[#B298ED] focus:border-[#B298ED]"
                            />
                          </div>
                        ) : (
                          `R$ ${p.price.toFixed(2).replace('.', ',')}`
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {editingId === p.id ? (
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => setEditingId(null)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                            <button onClick={() => saveProduct(p.id)} disabled={saving} className="p-2 text-green-600 hover:bg-green-50 bg-green-100 rounded-lg transition-colors">
                              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => startEditing(p)} className="p-2 text-[#B298ED] hover:bg-[#B298ED]/10 rounded-lg transition-colors inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                            <Edit2 className="w-3.5 h-3.5" /> Editar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
