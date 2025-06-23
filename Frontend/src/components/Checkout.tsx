import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

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
  };

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
      className="max-w-2xl mx-auto my-16 bg-white rounded-xl shadow-2xl p-8 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      {/* Título y navegación */}
      <header className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-3xl font-extrabold text-blue-600 flex items-center gap-2">
            🛒 <span>Tienda Virtual</span>
          </h1>
          <nav className="mt-4 sm:mt-0 flex gap-4">
            <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Inicio
            </Link>
            <Link to="/transactions" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Historial
            </Link>
          </nav>
        </div>
      </header>

      {/* Resumen de compra */}
      <div className="mb-6 bg-gray-100 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">🧾 Resumen de pedido:</h2>
        <ul className="text-gray-700 text-sm space-y-1">
          <li>📦 Producto: ${productPrice}</li>
          <li>🚚 Envío: ${deliveryFee}</li>
          <li>🔧 Base: ${baseFee}</li>
          <li className="font-bold text-gray-900 mt-2 text-base">💰 Total: ${total}</li>
        </ul>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-md font-medium text-gray-700 mb-2">📋 Tus datos:</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="customerName"
            placeholder="Nombre"
            className="border rounded px-3 py-2"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="customerEmail"
            placeholder="Correo electrónico"
            className="border rounded px-3 py-2"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="deliveryAddress"
            placeholder="Dirección de envío"
            className="col-span-full border rounded px-3 py-2"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cardNumber"
            placeholder="Número de tarjeta"
            className="border rounded px-3 py-2"
            value={form.cardNumber}
            onChange={handleChange}
          />
          <input
            type="number"
            name="codeCard"
            placeholder="CVC"
            className="border rounded px-3 py-2"
            value={form.codeCard}
            onChange={handleChange}
          />
          <input
            type="date"
            name="expirationDate"
            placeholder="Fecha de vencimiento"
            className="border rounded px-3 py-2"
            value={form.expirationDate}
            onChange={handleChange}
          />
        </div>

        {getCardLogo() === 'visa' && (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
            alt="VISA"
            className="w-20 mt-2"
          />
        )}
        {getCardLogo() === 'mastercard' && (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
            alt="Mastercard"
            className="w-20 mt-2"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-semibold transition mt-4"
        >
          💳 Pagar
        </button>
      </form>
    </Modal>
  );
}
