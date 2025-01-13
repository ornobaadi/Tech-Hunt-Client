import { useEffect, useState } from "react";
import { FaCircleChevronUp } from "react-icons/fa6";

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    // const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("/products.json"); // Replace with your API if needed
            const data = await response.json();
            const sortedProducts = data.sort(
                (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
            );
            setProducts(sortedProducts.slice(0, 4)); // Display only 4 products
        };
        fetchProducts();
    }, []);


    return (
        <div>
            <div className="container mx-auto text-center mb-12">
                <h4 className="btn pointer-events-none text-purple-500 uppercase text-sm font-bold my-5">Featured</h4>
                <h2 className="text-2xl lg:text-4xl font-bold text-base-content">Featured Products</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 container mx-auto">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="flex gap-4 p-5 bg-base-100 shadow-md rounded-lg hover:shadow-lg transition-shadow"
                    >
                        <img
                            src={product.productImage}
                            alt={product.productName}
                            className="w-20 h-20 rounded-md object-cover"
                        />
                        <div className="flex-1">
                            <a href={product.externalLink} className="text-lg font-bold hover:underline text-base-content">
                                {product.productName}
                            </a>
                            <p className="text-sm text-gray-500 mb-3">{product.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {product.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="badge badge-outline badge-primary text-xs"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <span className="text-xs text-gray-500">
                                Owned by {product.ownerName}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                className={`btn btn-primary flex items-center gap-2`}>
                                <FaCircleChevronUp />
                                {product.upvotes}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;