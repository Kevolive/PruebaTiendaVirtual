import { useEffect, useState } from "react";
import { getProducts } from "../api";
import { Link } from "react-router-dom";



type Product = {
    id: number,
    name: string,
    description: string,
    price: string,
    stock: number
};

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts()
            .then((data) => setProducts(data as Product[]))
            .catch((err) => console.error('Error al cargar el producto...', err));
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h2> Productos disponibles</h2>
            {products.length === 0 ? (
                <p>Cargando productos ...</p>
            ) : (
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p><strong>Precio:</strong>${product.price}</p>
                            <p><strong>Stock:</strong>{product.stock}</p>
                            <Link to={`/checkout/${product.id}`}>
                            <button>¡Comprar!</button>
                            </Link>
                            <hr />
                        </li>
                    ))}
                </ul>
            )}

        </div>
    )
}
