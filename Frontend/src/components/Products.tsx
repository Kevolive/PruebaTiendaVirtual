import { useEffect, useState } from "react";
import { getProducts } from "../api";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data as Product[]))
      .catch((err) => console.error("Error al cargar el producto...", err));
  }, []);

  return (
    <>         
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🛍 Productos Disponibles</h2>

        {products.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">Cargando productos...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>

                <div className="flex justify-between items-center text-gray-800 mb-2">
                  <span className="font-medium">💲{product.price}</span>
                  <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `Stock: ${product.stock}` : 'Agotado'}
                  </span>
                </div>

                <Link to={`/checkout/${product.id}`}>
                  <button
                    className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    disabled={product.stock === 0}
                  >
                    Comprar
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
