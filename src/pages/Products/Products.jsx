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
    const [displayProducts, setDisplayProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [sortBy, setSortBy] = useState("recent");
    const axiosSecure = useAxiosSecure();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const searchTerm = searchParams.get('q');
                const sort = searchParams.get('sort') || 'recent';
                setSortBy(sort);
                
                const response = await axiosSecure.get(searchTerm 
                    ? `/products/search?q=${searchTerm}`
                    : '/products'
                );
                
                const acceptedProducts = response.data.filter(p => p.status === 'accepted');
                setProducts(acceptedProducts);
                
                // Initial sort of products
                applySorting(acceptedProducts, sort);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchParams, axiosSecure]);

    // Apply sorting to products
    const applySorting = (productsToSort, sortType) => {
        let sorted = [...productsToSort];
        
        if (sortType === "popular") {
            // Sort by total upvotes (highest first)
            sorted.sort((a, b) => {
                const aUpvotes = a.upvote || 0;
                const bUpvotes = b.upvote || 0;
                return bUpvotes - aUpvotes;
            });
        } else {
            // Sort by timestamp (newest first)
            sorted.sort((a, b) => {
                const aDate = new Date(a.timestamp || a.createdAt || 0);
                const bDate = new Date(b.timestamp || b.createdAt || 0);
                return bDate - aDate;
            });
        }
        
        setDisplayProducts(sorted);
        setPageCount(Math.ceil(sorted.length / ITEMS_PER_PAGE));
        setItemOffset(0); // Reset to first page when sorting changes
    };

    // Handle sort option change
    const handleSortChange = (option) => {
        setSortBy(option);
        
        // Update URL with the sort parameter
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sort', option);
        setSearchParams(newParams);
        
        // Apply the new sorting
        applySorting(products, option);
    };

    const handleSearchResults = (searchTerm) => {
        const newParams = new URLSearchParams(searchParams);
        if (searchTerm) {
            newParams.set('q', searchTerm);
        } else {
            newParams.delete('q');
        }
        
        // Preserve the current sort parameter
        if (sortBy) {
            newParams.set('sort', sortBy);
        }
        
        setSearchParams(newParams);
    };

    const handlePageClick = (event) => {
        const newOffset = (event.selected * ITEMS_PER_PAGE) % displayProducts.length;
        setItemOffset(newOffset);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Get current products for display
    const getCurrentProducts = () => {
        const endOffset = itemOffset + ITEMS_PER_PAGE;
        return displayProducts.slice(itemOffset, endOffset);
    };

    return (
        <div className="px-4 py-8">
            <Helmet>
                <title>Products | Tech Hunt</title>
            </Helmet>
            
            <div className="flex flex-col md:flex-row items-center mb-6 gap-4">
                <div className="w-full md:w-2/3">
                    <SearchBar onSearchResults={handleSearchResults} />
                </div>
                <div className="w-full flex justify-end">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-outline">
                            {sortBy === "recent" ? "Recently Added" : "Most Popular"}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li className={sortBy === "recent" ? "bg-gray-100" : ""}>
                                <a onClick={() => handleSortChange("recent")}>Recently Added</a>
                            </li>
                            <li className={sortBy === "popular" ? "bg-gray-100" : ""}>
                                <a onClick={() => handleSortChange("popular")}>Most Popular</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            {loading ? (
                <div className="flex justify-center">
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            ) : (
                <div>
                    {displayProducts.length > 0 ? (
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
                                Showing {itemOffset + 1} to {Math.min(itemOffset + ITEMS_PER_PAGE, displayProducts.length)} of {displayProducts.length} products
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