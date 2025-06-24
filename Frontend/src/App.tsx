
import { Link, Route, Routes } from 'react-router-dom';
import './App.css'
import Products from './components/Products';
import Result from './components/Results';
import Checkout from './components/Checkout';
import Transactions from './components/Transactions';



function App() {


  return (
    <div style={{ padding: '1rem' }}>
      <header className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            🛒 Tienda Virtual
          </h1>
          <nav className="mt-4 sm:mt-0">
            <ul className="flex flex-col sm:flex-row gap-4">
              <li>
                <Link
                  to="/"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/transactions"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Historial de transacciones
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>


      <Routes>
        <Route path="/" element={<Products />} />
        <Route path='/checkout/:id' element={<Checkout />} />
        <Route path="/result" element={<Result />} />
        <Route path="/transactions" element={<Transactions />}></Route>

      </Routes>

    </div>
  )
}

export default App;
