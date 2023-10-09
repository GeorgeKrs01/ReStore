
import agent from "../../api/agent";
import { Product } from "../../models/product"
import ProductList from "./ProductList";
import { useState, useEffect } from "react";



export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        agent.Catalog.list().then(products => setProducts(products))
    }, [])



    return (
        <>
            <ProductList products={products} />
        </>
    )
}