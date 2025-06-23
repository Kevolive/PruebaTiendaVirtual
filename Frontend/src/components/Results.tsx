import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function Result() {
  const [params] = useSearchParams();
  const status = params.get('status');
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('lastTransaction');
    if (saved) {
      setTransaction(JSON.parse(saved));
    }

    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 text-center">
      <h2 className="text-2xl font-bold mb-4">🧾 Resultado del pago</h2>

      {status === 'APPROVED' ? (
        <div className="bg-green-100 text-green-800 p-4 rounded-md w-full max-w-md mb-4 shadow-md">
          <h3 className="text-xl font-semibold">✅ ¡Pago aprobado!</h3>
          <p className="mt-2">Gracias por tu compra.</p>
        </div>
      ) : (
        <div className="bg-red-100 text-red-800 p-4 rounded-md w-full max-w-md mb-4 shadow-md">
          <h3 className="text-xl font-semibold">❌ Pago rechazado o cancelado</h3>
          <p className="mt-2">Intenta nuevamente o elige otro método.</p>
        </div>
      )}

      {transaction && (
        <div className="bg-white p-4 rounded-md shadow-md w-full max-w-md text-left">
          <h4 className="font-semibold text-gray-700 mb-2">📦 Resumen de tu compra:</h4>
          <p><span className="font-semibold">👤 Cliente:</span> {transaction.customerName}</p>
          <p><span className="font-semibold">🆔 ID del producto:</span> {transaction.productId}</p>
          <p><span className="font-semibold">💵 Total pagado:</span> ${transaction.amount}</p>
          <p><span className="font-semibold">📌 Estado:</span> {transaction.status}</p>
        </div>
      )}

      <p className="text-sm text-gray-500 mt-6">Serás redirigido al inicio en 5 segundos...</p>
    </div>
  );
}
