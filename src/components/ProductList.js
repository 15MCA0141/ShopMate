import { useEffect, useState } from "react";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [url, setUrl] = useState("http://localhost:8000/products");
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
      setCounter(data.length);
    };
    fetchProducts();
  }, [url]);

  return (
    <>
      <div className="filter">
        <button onClick={() => setUrl("http://localhost:8000/products")}>
          All
        </button>
        <button
          onClick={() => setUrl("http://localhost:8000/products?inStock=true")}
        >
          In Stock only
        </button>
      </div>
      <div className={counter ? "count-more" : "count-zero"}>
        {counter} Products found!
      </div>
      {products.map((product) => (
        <div className="card" key={product.id}>
          <p className="id">{product.id}</p>
          <p className="name">{product.name}</p>
          <p className="info">
            <span>${product.price}</span>
            <span className={product.inStock ? "instock" : "unavailable"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </p>
        </div>
      ))}
    </>
  );
};
