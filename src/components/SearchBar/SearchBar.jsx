
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SearchBar = ({ onSearchResults }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
    const axiosSecure = useAxiosSecure();
    
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosSecure.get(`/products/search?q=${searchTerm}`);
            onSearchResults(response.data);
            setSearchParams({ q: searchTerm });
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    return (
        <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto mb-8">
            <div className="join w-full">
                <input
                    type="text"
                    placeholder="Search by tags or product name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered join-item w-full"
                />
                <button type="submit" className="btn join-item bg-purple-500 text-white">
                    Search
                </button>
            </div>
        </form>
    );
};

export default SearchBar;