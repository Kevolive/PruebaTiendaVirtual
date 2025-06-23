
import { Link, Route, Routes } from 'react-router-dom';
import './App.css'
import Products from './components/Products';
import Result from './components/Results';
import Checkout from './components/Checkout';
import Transactions from './components/Transactions';



function App() {
  

  return (
    <div style={{ padding: '1rem'}}>
      <header className="bg-white shadow-md p-4 flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-3xl font-extrabold text-blue-600 flex items-center gap-2 text-center">
          🛒 <span className="hidden sm:inline">Tienda Virtua</span>
        </h1>
        <nav className="mt-2 sm:mt-0">
          <ul className="flex gap-4 text-gray-700 font-medium">
            <li>
              <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 font-semibold shadow">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/transactions" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 font-semibold shadow">
                Historial de transacciones
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element= {<Products/>}/>
        <Route path='/checkout/:id' element={<Checkout/>}/>
        <Route path="/result" element={<Result />} />
        <Route path="/transactions" element={<Transactions/>}></Route>

      </Routes>

    </div>
  )
}

export default App;
