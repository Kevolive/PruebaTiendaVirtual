import { useEffect, useState } from "react";
import axios from 'axios';

interface Transaction {
  id: number;
  customerName: string;
  amount: number;
  status: string;
  createdAt: string;
  product: {
    name: string;
    price: string;
  };
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    axios
      .get<Transaction[]>('https://backend-wompi.onrender.com/transactions')
      .then((res) => {
        console.log("Transacciones recibidas:", res.data);
        setTransactions(res.data);
      })
      .catch((err) => console.error('Error al cargar las transacciones', err));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📄 Historial de transacciones</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-600">No hay transacciones registradas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">👤 Cliente</th>
                <th className="px-4 py-2">🛍 Producto</th>
                <th className="px-4 py-2">💵 Total</th>
                <th className="px-4 py-2">📌 Estado</th>
                <th className="px-4 py-2">📅 Fecha</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr
                  key={t.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">{t.customerName}</td>
                  <td className="px-4 py-2">{t.product.name}</td>
                  <td className="px-4 py-2">${t.amount}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      t.status === 'APPROVED'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {t.status === 'APPROVED' ? '✅ Aprobado' : '❌ Rechazado'}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
