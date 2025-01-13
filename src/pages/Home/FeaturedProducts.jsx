import { useEffect, useState } from "react";
import ProductItem from "../Shared/ProductItem";

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('products.json')
        .then(res => res.json())
        .then(data => {
            const featured = data.filter(item => item.category === "featured");
            setProducts(featured)})
    }, [])


    return (
        <div>
            <div className="container mx-auto text-center mb-12">
                <h4 className="btn pointer-events-none text-purple-500 uppercase text-sm font-bold my-5">Featured</h4>
                <h2 className="text-2xl lg:text-4xl font-bold text-base-content">Featured Products</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 container mx-auto">
                {products.map((product) => <ProductItem
                key={product.id}
                product={product}
                ></ProductItem>
                )}
            </div>
        </div>
    );
};

export default FeaturedProducts;