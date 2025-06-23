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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-8 text-center">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-6">
        🧾 Resultado del Pago
      </h2>

      <div className={`w-full max-w-md p-6 rounded-lg shadow-lg ${
        status === 'APPROVED'
          ? 'bg-green-50 text-green-800 border border-green-300'
          : 'bg-red-50 text-red-800 border border-red-300'
      }`}>
        <h3 className="text-xl font-bold mb-2">
          {status === 'APPROVED' ? '✅ ¡Pago aprobado!' : '❌ Pago rechazado o cancelado'}
        </h3>
        <p className="text-sm">
          {status === 'APPROVED'
            ? 'Gracias por tu compra. Tu transacción fue exitosa.'
            : 'Hubo un problema con tu pago. Puedes intentarlo nuevamente.'}
        </p>
      </div>

      {transaction && (
        <div className="w-full max-w-md bg-white mt-6 p-6 rounded-lg shadow-md text-left">
          <h4 className="font-semibold text-gray-700 mb-3">📦 Resumen de tu compra:</h4>
          <ul className="space-y-1 text-gray-700 text-sm">
            <li><span className="font-semibold">👤 Cliente:</span> {transaction.customerName}</li>
            <li><span className="font-semibold">🆔 ID Producto:</span> {transaction.productId}</li>
            <li><span className="font-semibold">💵 Total pagado:</span> ${transaction.amount}</li>
            <li>
              <span className="font-semibold">📌 Estado:</span>{' '}
              <span className={transaction.status === 'APPROVED' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                {transaction.status}
              </span>
            </li>
          </ul>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-8">
        Serás redirigido al inicio en 5 segundos...
      </p>
    </div>
  );
}
