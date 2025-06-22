import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Adjust the path if Modal is in a different location


export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();

  //Pedido
  const deliveryFee = 5000;
  const baseFee = 3000;
  const productPrice = 12000;
  const total = deliveryFee + baseFee + productPrice;


  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    deliveryAddress: '',
    cardNumber: '',
    codeCard:'',
    expirationDate:''
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    navigate('/');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post<{ 
        checkoutUrl: string; 
        status: string 
      }>('http://localhost:3000/transactions', {
        ...form,
        amount: total,
        productId: Number(id),
      });
      const status = response.data.status;

      localStorage.setItem('lastTransaction', JSON.stringify({
        productId: id,
        amount: total,
        customerName: form.customerName,
        status: response.data.status,

      }));

      navigate(`/result?status=${status}`);
    } catch (err) {
      console.error('Error al crear transacción:', err);
      navigate('/result?status=DECLINED')
    }
  };


  const getCardLogo = () => {
    const num = form.cardNumber;
    if (!num) return null;

    if (num.startsWith('4')) {
      return 'visa';
    } else if (num.startsWith('5')) {
      return 'mastercard';
    } else {
      return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}

      contentLabel='Formulario de pago'
      style={{
        content: {
          width: '90%',
          maxWidth: '400px',
          margin: 'auto',
          padding: '2rem',
          borderRadius: '12px',
          backgroundColor: '#f0f0f0'
        },
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.5'
        }
      }}>

      <h2>📝 Finalizar compra - Producto #{id}</h2>
      <div style={{ marginBottom: '1rem' }}>
        <h3>
          Resumen del pedido:
        </h3>
        <ul>
          <li>Producto: ${productPrice}</li>
          <li>Envío: ${deliveryFee}</li>
          <li>Base: ${baseFee}</li>
          <li><strong>Total: ${total}</strong></li>
        </ul>
      </div>
      <div>
        <h3>Por favor ingresa tus datos para continuar con la trasacción:</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerName"
          placeholder="Nombre"
          onChange={handleChange}
          required
        /><br />
        <input
          type="email"
          name="customerEmail"
          placeholder="Correo electrónico"
          onChange={handleChange}
          required
        /><br />
        <input
          type="text"
          name="deliveryAddress"
          placeholder="Dirección de envío"
          onChange={handleChange}
          required
        /><br />
        <input 
        type="text"
        name="cardNumber"
        placeholder='Número de la tarjeta'
        value={form.cardNumber}
        onChange={handleChange}
         /><br />
        <input 
        type="number"
        name="codeCard"
        placeholder='CVC'
        value={form.codeCard}
        onChange={handleChange}
         /><br />
        <input 
        type="date"
        name="expirationDate"
        placeholder='Fecha de vencimiento'
        value={form.expirationDate}
        onChange={handleChange}
         /><br /><br />

         {getCardLogo() === 'visa' && (
          <img 
          src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
          alt="VISA"
          style={{ width: '60px', marginTop:'0.5rem'}} />
          
         )}
         {getCardLogo() === 'mastercard' && (
          <img 
          src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
          alt="Mastercard"
          style={{ width: '60px', marginTop:'0.5rem'}} />
          
         )}
        <button type="submit">Pagar</button>
      </form>
    </Modal>
  );
}
