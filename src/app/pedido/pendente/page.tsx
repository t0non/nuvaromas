'use client';
import { Clock, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function OrderPending() {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [qrCodeBase64, setQrCodeBase64] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Busca o QR code do sessionStorage gerado no momento do checkout
    setQrCode(sessionStorage.getItem('pix_qr_code'));
    setQrCodeBase64(sessionStorage.getItem('pix_qr_code_base64'));
  }, []);

  const handleCopy = () => {
    if (qrCode) {
      navigator.clipboard.writeText(qrCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl shadow-xl border border-cinza-suave/40">
        <Clock className="w-16 h-16 text-yellow-500 mx-auto" />
        <h1 className="font-plus-jakarta-sans text-2xl font-bold text-deep-purple">Aguardando Pagamento</h1>
        
        {qrCodeBase64 ? (
          <div className="space-y-4">
            <p className="text-texto-escuro/70 text-sm">
              Escaneie o QR Code abaixo com o aplicativo do seu banco para finalizar a compra:
            </p>
            <div className="flex justify-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <img 
                src={`data:image/jpeg;base64,${qrCodeBase64}`} 
                alt="QR Code Pix" 
                className="w-48 h-48 object-contain"
              />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-semibold text-texto-escuro">Ou use o Pix Copia e Cola:</p>
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
                <input 
                  type="text" 
                  value={qrCode || ''} 
                  readOnly 
                  className="w-full bg-transparent text-xs text-gray-500 outline-none truncate"
                />
                <button 
                  onClick={handleCopy}
                  className="p-2 bg-[#B298ED] hover:bg-[#A385E0] text-white rounded-lg transition-colors flex-shrink-0"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-texto-escuro/70">
            Recebemos o seu pedido! Ele está aguardando a confirmação do pagamento. Se você pagou via boleto, pode levar até 2 dias úteis.
          </p>
        )}

        <div className="pt-4">
          <Link href="/" className="inline-block bg-white border border-[#B298ED] text-[#B298ED] hover:bg-gray-50 font-bold py-3 px-8 rounded-full uppercase tracking-widest text-sm transition-all shadow-sm">
            Voltar para a Loja
          </Link>
        </div>
      </div>
    </div>
  );
}
