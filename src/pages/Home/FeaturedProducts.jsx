import ProductItem from "../Shared/ProductItem";
import useProducts from "../../hooks/useProducts";
import { useEffect, useState } from "react";

const FeaturedProducts = () => {
    const [products] = useProducts();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter featured products and sort by timestamp
    const featured = products
        .filter(product => product.featured === true)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, Math.max(4, products.length));

    useEffect(() => {
        if (products.length > 0) {
            setLoading(false);
        }
    }, [products]);

    if (loading) {
        return <div className="text-center">
            <span className="loading loading-bars loading-xl"></span>
        </div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    if (featured.length === 0) {
        return <div className="text-center">No featured products available.</div>;
    }

    return (
        <div>
            <div className="text-center my-12">
                <h4 className="btn pointer-events-none text-purple-500 uppercase text-sm font-bold my-5">
                    Featured
                </h4>
                <h2 className="text-2xl lg:text-4xl font-bold text-base-content">
                    Featured Products
                </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featured.map((product) => (
                    <ProductItem
                        key={product._id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;