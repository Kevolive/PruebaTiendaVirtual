import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Result() {
  const [params] = useSearchParams();
  const status = params.get('status');
  
  const [transaction, setTransaction]= useState<any>(null);

   useEffect(() => {
      const saved = localStorage.getItem('lastTransaction');
      if (saved){
        setTransaction(JSON.parse(saved))
      }
    }, []);
  return (
   
    <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
      <h2>Resultado del pago</h2>
      {status === 'APPROVED' ? (
        <div>
          <h3 style={{ color: 'green' }}>¡Pago aprobado!</h3>
          <p>Gracias por tu compra </p>
        </div>
      ) : (
        <div>
          <h3 style={{ color: 'red' }}>Pago rechazado o cancelado</h3>
          <p>Intenta nuevamente o elige otro método.</p>
        </div>
        
      )}
      {transaction && (
  <div style={{ marginTop: '2rem', textAlign: 'left', maxWidth: '400px', marginInline: 'auto' }}>
    <h4>Resumen de tu compra:</h4>
    <p><strong>Cliente:</strong> {transaction.customerName}</p>
    <p><strong>ID del producto:</strong> {transaction.productId}</p>
    <p><strong>Total pagado:</strong> ${transaction.amount}</p>
    <p><strong>Estado:</strong> {transaction.status}</p>
  </div>
)}

    </div>
    
  );
  
}
