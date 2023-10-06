import { useEffect, useState } from "react";
import { Product } from "./product";



function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5131/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])


  function addProduct() {
    setProducts(prevState => [...prevState,
    {
      id: prevState.length + 101,
      name: 'product3' + (prevState.length + 1),
      price: (prevState.length * 100) + 100,
      brand: 'sadas',
      description: 'aiosufhsaiu hasidu h',
      pictureUrl: 'http://picsum.photos/200',
    }
    ])
  }

  return (
    <div className="App">
      <h1>Re-Store</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - {product.price}</li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default App;
