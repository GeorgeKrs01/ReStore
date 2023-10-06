import { Product } from "../../models/product"
import ProductList from "./ProductList";
import { useState, useEffect } from "react";



export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:5131/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [])



    return (
        <>
            <ProductList products={products} />
        </>
    )
}