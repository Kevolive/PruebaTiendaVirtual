import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
Modal.setAppElement('#root')

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const deliveryFee = 5000;
  const baseFee = 3000;
  const productPrice = 12000;
  const total = deliveryFee + baseFee + productPrice;

  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    deliveryAddress: '',
    cardNumber: '',
    codeCard: '',
    expirationDate: ''
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
      const response = await axios.post<{ checkoutUrl: string; status: string }>(
        'https://backend-wompi.onrender.com/transactions',
        {
          ...form,
          amount: total,
          productId: Number(id),
        }
      );

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
      navigate('/result?status=DECLINED');
    }
  };

  const getCardLogo = () => {
    const num = form.cardNumber;
    if (!num) return null;
    if (num.startsWith('4')) return 'visa';
    if (num.startsWith('5')) return 'mastercard';
    return null;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Formulario de pago"
      className="max-w-md mx-auto my-20 bg-white rounded-xl shadow-lg p-6 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <header className="bg-white shadow-md p-4 flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-3xl font-extrabold text-blue-600 flex items-center gap-2">
          🛒 <span className="hidden sm:inline">Tienda Virtual</span>
        </h1>
        <nav className="mt-2 sm:mt-0">
          <ul className="flex gap-4 text-gray-700 font-medium">
            <li>
              <Link to="/" className="hover:text-blue-600 transition-colors duration-200 btn btn-primary">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/transactions" className="hover:text-blue-600 transition-colors duration-200">
                Historial de transacciones
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <h2 className="text-xl font-bold mb-4 text-center">📝 Finalizar compra - Producto #{id}</h2>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-700">Resumen del pedido:</h3>
        <ul className="text-sm text-gray-600 mt-2">
          <li>Producto: ${productPrice}</li>
          <li>Envío: ${deliveryFee}</li>
          <li>Base: ${baseFee}</li>
          <li className="font-bold text-gray-800 mt-2">Total: ${total}</li>
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-700">Por favor ingresa tus datos:</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="customerName"
          placeholder="Nombre"
          className="w-full border rounded px-3 py-2"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="customerEmail"
          placeholder="Correo electrónico"
          className="w-full border rounded px-3 py-2"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="deliveryAddress"
          placeholder="Dirección de envío"
          className="w-full border rounded px-3 py-2"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="Número de la tarjeta"
          className="w-full border rounded px-3 py-2"
          value={form.cardNumber}
          onChange={handleChange}
        />
        <input
          type="number"
          name="codeCard"
          placeholder="CVC"
          className="w-full border rounded px-3 py-2"
          value={form.codeCard}
          onChange={handleChange}
        />
        <input
          type="date"
          name="expirationDate"
          placeholder="Fecha de vencimiento"
          className="w-full border rounded px-3 py-2"
          value={form.expirationDate}
          onChange={handleChange}
        />

        {getCardLogo() === 'visa' && (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
            alt="VISA"
            className="w-16 mt-2"
          />
        )}
        {getCardLogo() === 'mastercard' && (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
            alt="Mastercard"
            className="w-16 mt-2"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Pagar
        </button>
      </form>
    </Modal>
  );
}
