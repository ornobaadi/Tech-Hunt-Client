import { useEffect, useState } from "react";
import ProductItem from "../Shared/ProductItem";
import { Link } from "react-router-dom";

const TrendingProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => {
                const trending = data.sort((a, b) => b.upvotes - a.upvotes);
                setProducts(trending.slice(0, 6));
            });
    }, []);

    return (
        <div>
            <div className="container mx-auto text-center my-12">
                <h4 className="btn pointer-events-none text-purple-500 uppercase text-sm font-bold my-5">Trending</h4>
                <h2 className="text-2xl lg:text-4xl font-bold text-base-content">Trending Products</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 container mx-auto">
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
            <div className="text-center my-6">
                <Link to="/products"
                    className="btn btn-outline btn-primary">
                    Show All Products
                </Link>
            </div>
        </div>
    );
};

export default TrendingProducts;
