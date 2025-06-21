import { useEffect, useState } from "react";
import axios from 'axios'

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
    const [transactions, setTransactions] = useState<Transaction[]> ([]);

    useEffect(() => {
        axios.get<Transaction[]>('http://localhost:3000/transactions')
        .then((res) => {
            console.log("Transacciones recibidas:", res.data);
            
            setTransactions(res.data)})
        .catch((err) => console.error('Error al cargar las transacciones', err));
    }, []);


    return (
        <div style= {{ padding: '16px'}}>
        <h2>Historial de transacciones</h2>
        {transactions.length === 0 ? (
            <p>No hay transacciones registradas</p>
        ) : (
            <table border={1} cellPadding={8} style={{ width: '100%', marginTop:'16px'}}>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Producto</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((t) => (
                        <tr key={t.id}>
                            <td>{t.customerName}</td>
                            <td>{t.product.name}</td>
                            <td>${t.amount}</td>
                            <td style={{color: t.status === 'APROVED' ? 'green': 'red'}}>
                                {t.status}
                            </td>
                            <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        )}
        </div>
    )
        
    }