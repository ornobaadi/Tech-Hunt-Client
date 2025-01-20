import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ProductItem from "../Shared/ProductItem";
import SearchBar from "../../components/SearchBar/SearchBar";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet-async";

const ITEMS_PER_PAGE = 6;

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
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
                
                const acceptedProducts = response.data.filter(p => p.status === 'accepted');
                setProducts(acceptedProducts);
                setPageCount(Math.ceil(acceptedProducts.length / ITEMS_PER_PAGE));
                
                setItemOffset(0);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchParams, axiosSecure]);

    const handleSearchResults = (searchTerm) => {
        const currentParams = new URLSearchParams(window.location.search);
        if (searchTerm) {
            currentParams.set('q', searchTerm);
        } else {
            currentParams.delete('q');
        }
        window.history.pushState({}, '', `${window.location.pathname}?${currentParams}`);
        window.dispatchEvent(new Event('popstate'));
    };

    const handlePageClick = (event) => {
        const newOffset = (event.selected * ITEMS_PER_PAGE) % products.length;
        setItemOffset(newOffset);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Get current products for display
    const getCurrentProducts = () => {
        const endOffset = itemOffset + ITEMS_PER_PAGE;
        return products.slice(itemOffset, endOffset);
    };

    return (
        <div className="px-4 py-8">
            <Helmet>
                <title>Products | Tech Hunt</title>
            </Helmet>
            <SearchBar onSearchResults={handleSearchResults} />
            
            {loading ? (
                <div className="flex justify-center">
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            ) : (
                <div>
                    {products.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {getCurrentProducts().map(product => (
                                    <ProductItem 
                                        key={product._id} 
                                        product={product}
                                    />
                                ))}
                            </div>
                            
                            {pageCount > 1 && (
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel={
                                        <span className="flex items-center px-3 py-2 cursor-pointer">
                                            Next <span className="ml-1">→</span>
                                        </span>
                                    }
                                    previousLabel={
                                        <span className="flex items-center px-3 py-2 cursor-pointer">
                                            <span className="mr-1">←</span> Previous
                                        </span>
                                    }
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={2}
                                    pageCount={pageCount}
                                    renderOnZeroPageCount={null}
                                    containerClassName="flex items-center justify-center space-x-1 mt-8 mb-4"
                                    pageClassName="block border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                                    pageLinkClassName="block px-3 py-2 text-sm text-gray-700 hover:text-gray-900"
                                    previousClassName="block border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                                    nextClassName="block border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                                    breakClassName="block px-3 py-2"
                                    activeClassName="!bg-purple-500 border-blue-500"
                                    activeLinkClassName="!text-white hover:!text-white"
                                    disabledClassName="opacity-50 cursor-not-allowed"
                                />
                            )}
                            
                            <div className="text-center text-sm text-gray-600 mt-4">
                                Showing {itemOffset + 1} to {Math.min(itemOffset + ITEMS_PER_PAGE, products.length)} of {products.length} products
                            </div>
                        </>
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