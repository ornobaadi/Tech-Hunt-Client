import ProductItem from "../Shared/ProductItem";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const searchTerm = searchParams.get('q');
                const url = searchTerm 
                    ? `/products/search?q=${searchTerm}`
                    : '/products';
                    
                const response = await axiosSecure.get(url);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchParams, axiosSecure]);

    const handleSearchResults = (results) => {
        setProducts(results);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <SearchBar onSearchResults={handleSearchResults} />
            
            {loading ? (
                <div className="flex justify-center">
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            ) : (
                <div className="space-y-4">
                    {products.map(product => (
                        <ProductItem key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;