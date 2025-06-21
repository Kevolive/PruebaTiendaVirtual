
import { Link, Route, Routes } from 'react-router-dom';
import './App.css'
import Products from './components/Products';
import Result from './components/Results';
import Checkout from './components/Checkout';

function App() {
  

  return (
    <div style={{ padding: '1rem'}}>
      <h1> 🛒 ¡Tienda Virtual!</h1>
      <nav style={{ marginBottom: '1rem'}}>
        <Link to= "/">Inicio</Link>
      </nav>

      <Routes>
        <Route path="/" element= {<Products/>}/>
        <Route path='/checkout/:id' element={<Checkout/>}/>
        <Route path="/result" element={<Result />} />

      </Routes>

    </div>
  )
}

export default App;
