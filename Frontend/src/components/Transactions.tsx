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
            <h2 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">
                📄 Historial de Transacciones
            </h2>

            {transactions.length === 0 ? (
                <p className="text-gray-500 text-center">No hay transacciones registradas.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600 shadow-lg rounded-lg overflow-hidden">
                        <thead className="text-xs uppercase bg-blue-50 text-blue-800">
                            <tr>
                                <th className="px-6 py-4">👤 Cliente</th>
                                <th className="px-6 py-4">🛍 Producto</th>
                                <th className="px-6 py-4">💵 Total</th>
                                <th className="px-6 py-4">📌 Estado</th>
                                <th className="px-6 py-4">📅 Fecha</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {transactions.map((t, index) => (
                                <tr key={t.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                    <td className="px-6 py-3">{t.customerName}</td>
                                    <td className="px-6 py-3">{t.product.name}</td>
                                    <td className="px-6 py-3 font-medium">${t.amount}</td>
                                    <td className="px-6 py-3 font-semibold">
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${t.status === 'APPROVED'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            {t.status === 'APPROVED' ? '✅ Aprobado' : '❌ Rechazado'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3">{new Date(t.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-100 font-bold text-gray-800">
                                <td colSpan={2} className="px-6 py-4 text-right">Total ventas no aprobadas:</td>
                                <td className="px-6 py-4">
                                    ${transactions
                                        .filter((t) => t.status === 'DECLINED')
                                        .reduce((acc, t) => acc + Number(t.amount), 0)}
                                </td>
                                <td colSpan={2}></td>
                            </tr>
                        </tfoot>

                        <tfoot>
                            <tr className="bg-gray-100 font-bold text-gray-800">
                                <td colSpan={2} className="px-6 py-4 text-right">Total ventas aprobadas:</td>
                                <td className="px-6 py-4">
                                    ${transactions
                                        .filter((t) => t.status === 'APPROVED')
                                        .reduce((acc, t) => acc + Number(t.amount), 0)}
                                </td>
                                <td colSpan={2}></td>
                            </tr>
                        </tfoot>



                    </table>
                </div>
            )}
        </div>
    );
}
