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
      .get<Transaction[]>('https://wompi-backend-y2qy.onrender.com/transactions')
      .then((res) => {
        console.log("Transacciones recibidas:", res.data);
        setTransactions(res.data);
      })
      .catch((err) => console.error('Error al cargar las transacciones', err));
  }, []);

  const totalAprobadas = transactions
    .filter(t => t.status === 'APPROVED')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalRechazadas = transactions
    .filter(t => t.status !== 'APPROVED')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="mt-10 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">📄 Historial de Transacciones</h2>
        
      </div>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">No hay transacciones registradas.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3">👤 Cliente</th>
                  <th className="px-4 py-3">🛍 Producto</th>
                  <th className="px-4 py-3">💵 Total</th>
                  <th className="px-4 py-3">📌 Estado</th>
                  <th className="px-4 py-3">📅 Fecha</th>
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
                    <td className={`px-4 py-2 font-medium ${t.status === 'APPROVED' ? 'text-green-600' : 'text-red-600'}`}>
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


          <div className="mt-6 flex flex-col sm:flex-row sm:justify-center sm:gap-10 text-center text-lg font-semibold text-gray-800">
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded shadow">
              ✅ Total Aprobadas: ${totalAprobadas.toLocaleString('es-CO')}
            </div>
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded shadow mt-4 sm:mt-0">
              ❌ Total Rechazadas: ${totalRechazadas.toLocaleString('es-CO')}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
