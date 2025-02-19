/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCircleChevronUp } from "react-icons/fa6";
import { GrShare } from "react-icons/gr";
import { FaClock } from "react-icons/fa";
import { motion } from 'framer-motion'; // optional - install if you want animations
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUpvote from "../../hooks/useUpvote";
import useProducts from "../../hooks/useProducts";
import Swal from "sweetalert2";

const ProductItem = ({ product }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [upvote, refetch] = useUpvote();
    const [, refetchProducts] = useProducts();
    const [currentUpvotes, setCurrentUpvotes] = useState(product.upvotes || 0);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isUpvoting, setIsUpvoting] = useState(false);

    const { _id, productImage, productName, externalLink, tags, ownerName, ownerEmail, description, timestamp } = product;

    const isOwner = user?.email === ownerEmail;

    // Format date and time
    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp);
        return {
            date: date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            }),
            time: date.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit'
            })
        };
    };

    const { date, time } = timestamp ? formatDateTime(timestamp) : { date: 'N/A', time: 'N/A' };

    useEffect(() => {
        if (upvote) {
            setIsUpvoted(upvote.some(item => item.productId === _id));
        }
    }, [upvote, _id]);

    const handleUpvoteProcess = async () => {
        if (isUpvoting || isOwner) return;

        try {
            setIsUpvoting(true);
            
            if (isUpvoted) {
                setIsUpvoted(false);
                setCurrentUpvotes(prev => prev - 1);

                const existingUpvote = upvote.find(item => item.productId === _id);
                const res = await axiosSecure.delete(`/upvotes/${existingUpvote._id}`);
                
                if (res.data.deletedCount > 0) {
                    // Silently refresh data in background
                    Promise.all([refetch(), refetchProducts()]);
                    
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Upvote removed from ${productName}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } else {
                setIsUpvoted(true);
                setCurrentUpvotes(prev => prev + 1);

                const upvoteItem = {
                    productId: _id,
                    email: user.email,
                    productName,
                    productImage,
                    timestamp: new Date().toISOString()
                };

                const res = await axiosSecure.post('/upvotes', upvoteItem);
                
                if (res.data.insertedId) {
                    Promise.all([refetch(), refetchProducts()]);
                    
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${productName} upvoted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        } finally {
            setIsUpvoting(false);
        }
    };

    const handleUpvote = () => {
        if (!user?.email) {
            localStorage.setItem('pendingUpvote', _id);
            Swal.fire({
                title: "Login Required",
                text: "Please login to upvote this tech!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                } else {
                    localStorage.removeItem('pendingUpvote');
                }
            });
            return;
        }

        handleUpvoteProcess();
    };

    return (
        <div className="h-full group">
            <div className="flex flex-col h-full gap-4 p-6 rounded-xl border border-gray-300 shadow-sm hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-90">
                <div className="flex gap-5">
                    {/* Product Image with subtle gradient overlay */}
                    <div className="relative overflow-hidden rounded-lg">
                        <img
                            src={productImage}
                            alt={productName}
                            className="w-14 h-14 lg:w-24 lg:h-24 object-cover transform transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <Link
                                to={`/product/${_id}`}
                                className="text-lg font-bold text-base-content hover:text-purple-700 dark:hover:text-purple-400 transition-colors duration-200 truncate"
                            >
                                {productName}
                            </Link>
                            <a 
                                href={externalLink}
                                className="text-gray-500 hover:text-purple-500 transition-colors duration-200 flex-shrink-0"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit external link"
                            >
                                <GrShare className="text-sm" />
                            </a>
                        </div>
                        
                        <p className="text-sm text-base-content my-3 line-clamp-2 leading-relaxed">{description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2.5 py-1 text-xs font-medium border rounded-full text-purple-700 transition-colors duration-200 hover:bg-purple-100 cursor-pointer"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        
                        {timestamp && (
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <FaClock className="text-purple-400" />
                                <span>Added on {date} at {time}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-auto pt-3 border-t border-gray-300">
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <div className="w-5 h-5 rounded-full bg-purple-200 flex items-center justify-center text-xs text-purple-800 font-medium overflow-hidden">
                                {ownerName.charAt(0).toUpperCase()}
                            </div>
                            <span>by {ownerName}</span>
                        </span>
                        
                        {/* Original upvote button style preserved */}
                        <button
                            onClick={handleUpvote}
                            disabled={isOwner || isUpvoting}
                            className={`btn ${isUpvoted ? 'btn-success' : 'btn-outline'} 
                                    ${isOwner ? 'btn-disabled' : ''} 
                                    flex items-center gap-2`}
                        >
                            <FaCircleChevronUp />
                            {currentUpvotes}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;