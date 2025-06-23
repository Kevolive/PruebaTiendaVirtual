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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <section className="mb-10 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-700 mb-2">
          🛍 Productos Disponibles
        </h2>
        <p className="text-gray-600 text-base sm:text-lg">
          Elige el producto que deseas comprar
        </p>
      </section>

      {products.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">Cargando productos...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{product.description}</p>
              </div>

              <div className="mt-auto">
                <div className="flex justify-between items-center text-gray-800 mb-3 text-sm sm:text-base">
                  <span className="font-semibold">💲{product.price}</span>
                  <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `Stock: ${product.stock}` : 'Agotado'}
                  </span>
                </div>

                <Link to={`/checkout/${product.id}`}>
                  <button
                    className={`w-full py-2 px-4 rounded-lg font-medium text-white transition ${
                      product.stock > 0
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    disabled={product.stock === 0}
                  >
                    {product.stock > 0 ? 'Comprar' : 'No disponible'}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
