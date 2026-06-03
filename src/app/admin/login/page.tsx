'use client';

import { useState } from 'react';
import { Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError('Senha incorreta. Tente novamente.');
      }
    } catch (err) {
      setError('Erro de conexão.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-deep-purple flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-[#B298ED]/10 rounded-full">
            <Lock className="w-8 h-8 text-[#B298ED]" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-texto-escuro font-plus-jakarta-sans mb-8">
          Acesso Restrito
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Senha do Administrador</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-texto-escuro rounded-xl p-3 focus:ring-2 focus:ring-[#B298ED] focus:border-transparent transition-all outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#B298ED] hover:bg-[#A385E0] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>Entrar <ArrowRight className="w-5 h-5" /></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
