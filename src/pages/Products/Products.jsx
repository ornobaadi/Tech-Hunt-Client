import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ProductItem from "../Shared/ProductItem";
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
                const response = await axiosSecure.get(searchTerm 
                    ? `/products/search?q=${searchTerm}`
                    : '/products'
                );
                
                // Only filter for accepted products
                const acceptedProducts = response.data.filter(p => p.status === 'accepted');
                setProducts(acceptedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchParams, axiosSecure]);

    const handleSearchResults = (searchTerm) => {
        // Update the search params which will trigger the useEffect
        const currentParams = new URLSearchParams(window.location.search);
        if (searchTerm) {
            currentParams.set('q', searchTerm);
        } else {
            currentParams.delete('q');
        }
        window.history.pushState({}, '', `${window.location.pathname}?${currentParams}`);
        // This will trigger the useEffect which will fetch the data
        window.dispatchEvent(new Event('popstate'));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <SearchBar onSearchResults={handleSearchResults} />
            
            {loading ? (
                <div className="flex justify-center">
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            ) : (
                <div>
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map(product => (
                                <ProductItem 
                                    key={product._id} 
                                    product={product}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <h3 className="text-xl font-semibold text-gray-600">
                                No products found
                            </h3>
                            <p className="text-gray-500 mt-2">
                                Try adjusting your search criteria
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Products;