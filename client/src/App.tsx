import { useEffect, useState } from "react";



function App() {
  const [products, setProducts] = useState(
    [
      { name: '1', price: "10" },
      { name: '2', price: "20" }
    ]);

  useEffect(() => {
    fetch('http://localhost:5131/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])


  function addProduct() {
    setProducts(prevState => [...prevState, { name: 'product3' + (prevState.length + 1), price: `${(prevState.length * 100) + 100}` }])
  }

  return (
    <div className="App">
      <h1>Re-Store</h1>
      <ul>
        {products.map((item, index) => (
          <li key={index}>{item.name} - {item.price}</li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default App;
