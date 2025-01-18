/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCircleChevronUp } from "react-icons/fa6";
import { GrShare } from "react-icons/gr";
import { FaClock } from "react-icons/fa";
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
        const pendingUpvoteId = localStorage.getItem('pendingUpvote');
        if (user && pendingUpvoteId === _id) {
            localStorage.removeItem('pendingUpvote');
            handleUpvoteProcess();
        }
    }, [user]);

    const handleUpvoteProcess = () => {
        if (isOwner) {
            Swal.fire({
                icon: "error",
                title: "Cannot upvote own product",
                text: "You cannot upvote your own products",
            });
            return;
        }

        const existingUpvote = upvote.find(item => item.productId === _id);

        if (existingUpvote) {
            axiosSecure.delete(`/upvotes/${existingUpvote._id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        setCurrentUpvotes(prev => prev - 1);
                        refetch();
                        refetchProducts();

                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `Upvote removed from ${productName}`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
        } else {
            const upvoteItem = {
                productId: _id,
                email: user.email,
                productName,
                productImage,
                timestamp: new Date().toISOString()
            }
            axiosSecure.post('/upvotes', upvoteItem)
                .then(res => {
                    if (res.data.insertedId) {
                        setCurrentUpvotes(prev => prev + 1);
                        refetch();
                        refetchProducts();

                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${productName} upvoted`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
        }
    };

    const handleUpvote = () => {
        if (user && user.email) {
            handleUpvoteProcess();
        } else {
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
                    navigate('/login', { state: { from: location } })
                } else {
                    localStorage.removeItem('pendingUpvote');
                }
            });
        }
    }

    useEffect(() => {
        setCurrentUpvotes(product.upvotes || 0);
    }, [product.upvotes]);

    const hasUpvoted = upvote.some(item => item.productId === _id);

    return (
        <div className="h-full">
            <div className="flex flex-col h-full gap-4 p-5 bg-base-100 shadow-md rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                    <img
                        src={productImage}
                        alt={productName}
                        className="w-12 h-12 lg:w-24 lg:h-24 rounded-md object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <Link
                                to={`/product/${_id}`}
                                className="text-lg font-bold hover:underline text-base-content truncate"
                            >
                                {productName}
                            </Link>
                            <a href={externalLink}
                                className="hover:text-purple-700 flex-shrink-0"
                                target="_blank"
                                rel="noopener noreferrer">
                                <GrShare />
                            </a>
                        </div>
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="badge cursor-pointer badge-outline badge-primary text-xs"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        {timestamp && (
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <FaClock className="text-purple-500" />
                                <span>Added on {date} at {time}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-auto">
                    <div className="flex justify-between items-center gap-4 mb-2">
                        <span className="text-xs text-gray-500">
                            Owned by {ownerName}
                        </span>
                        <button
                            onClick={handleUpvote}
                            disabled={isOwner}
                            className={`btn ${hasUpvoted ? 'btn-success' : 'btn-outline'} 
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