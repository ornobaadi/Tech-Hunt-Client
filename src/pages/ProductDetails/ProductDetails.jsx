import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCircleChevronUp, FaClock, FaRegComment } from "react-icons/fa6";
import ReactStars from 'react-awesome-stars-rating';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUpvote from '../../hooks/useUpvote';
import useProducts from '../../hooks/useProducts';
import Swal from 'sweetalert2';
import { GrShare } from "react-icons/gr";
import { Helmet } from 'react-helmet-async';

const ProductDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [upvote, refetch] = useUpvote();
    const [, refetchProducts] = useProducts();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentUpvotes, setCurrentUpvotes] = useState(0);
    const [isUpvoting, setIsUpvoting] = useState(false);

    // Fetch product details
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosSecure.get(`/product/${id}`);
                setProduct(response.data);
                setCurrentUpvotes(response.data.upvotes || 0);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, axiosSecure]);

    // Fetch reviews
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axiosSecure.get(`/reviews/${id}`);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [id, axiosSecure]);

    const hasUpvoted = upvote.some(item => item.productId === id);
    const isOwner = user?.email === product?.ownerEmail;

    const handleUpvote = () => {
        if (isUpvoting || isOwner) return;

        setIsUpvoting(true);
        const existingUpvote = upvote.find(item => item.productId === id);

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
                            title: `Upvote removed from ${product.productName}`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
                .finally(() => setIsUpvoting(false));
        } else {
            const upvoteItem = {
                productId: id,
                email: user.email,
                productName: product.productName,
                productImage: product.productImage,
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
                            title: `${product.productName} upvoted`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
                .finally(() => setIsUpvoting(false));
        }
    };

    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleReport = async () => {
        try {
            const { value: reportReason } = await Swal.fire({
                title: 'Report Product',
                input: 'textarea',
                inputLabel: 'Reason for reporting',
                inputPlaceholder: 'Type your reason here...',
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write something!';
                    }
                },
                showCancelButton: true,
                confirmButtonColor: '#7e22ce',
                cancelButtonColor: '#d1d5db',
                confirmButtonText: 'Submit Report'
            });

            if (reportReason) {
                const reportData = {
                    productId: id,
                    productName: product.productName,
                    reportedBy: user.email,
                    reporterName: user.displayName,
                    productImage: product.productImage,
                    ownerEmail: product.ownerEmail,
                    ownerName: product.ownerName,
                    productTimestamp: product.createdAt,
                    reason: reportReason,
                    timestamp: new Date()
                };

                const response = await axiosSecure.post('/reports', reportData);

                if (response.data.insertedId) {
                    await Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Report submitted successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        } catch (error) {
            console.error('Error submitting report:', error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to submit report. Please try again."
            });
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            Swal.fire('Error', 'Please select a rating before submitting', 'error');
            return;
        }

        const reviewData = {
            productId: id,
            reviewerName: user.displayName,
            reviewerImage: user.photoURL,
            rating: rating,
            description: reviewText,
            timestamp: new Date()
        };

        try {
            await axiosSecure.post('/reviews', reviewData);
            setReviews([...reviews, reviewData]);
            setReviewText('');
            setRating(0);
            Swal.fire('Success', 'Review posted successfully!', 'success');
        } catch (error) {
            Swal.fire('Error', 'Failed to post review.', 'error');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-12 h-12 border-4 border-t-purple-600 border-gray-200 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
                <p className="text-gray-600 mt-2">The product you're looking for doesn't exist or has been removed.</p>
                <Link to="/" className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Helmet>
                <title>{product.productName} | Tech Hunt</title>
            </Helmet>
            
            {/* Product Details Section */}
            <div className="mb-8 rounded-xl border border-base-300 shadow-md overflow-hidden">
                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-shrink-0">
                            <div className="relative overflow-hidden rounded-lg">
                                <img
                                    src={product.productImage}
                                    alt={product.productName}
                                    className="w-full md:w-64 md:h-64 object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                            
                            
                        </div>
                        
                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-5">
                                <h1 className="text-2xl md:text-3xl font-bold">{product.productName}</h1>
                                
                                <div className="flex gap-3 self-start">
                                    <a
                                        href={product.externalLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                    >
                                        Visit Website <GrShare className="text-white" />
                                    </a>
                                    <button
                                        onClick={handleReport}
                                        className="btn btn-error bg-error/60 border border-gray-300 text-base-content rounded-lg"
                                    >
                                        Report
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-5">
                                {product.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-sm font-medium rounded-full text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors cursor-pointer"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            
                            <p className="text-base-content mb-6 leading-relaxed">{product.description}</p>
                            
                            <div className="flex items-center gap-2 text-sm  mt-auto pt-4 border-t border-gray-100">
                                <div className="w-6 h-6 rounded-full bg-purple-200 flex items-center justify-center text-xs text-purple-800 font-medium overflow-hidden">
                                    {product.ownerName?.charAt(0).toUpperCase() || '?'}
                                </div>
                                <span>by {product.ownerName}</span>
                                
                                <span className="mx-2">•</span>
                                
                                <FaClock className="text-purple-400" />
                                <span>
                                    Added on: {product.timestamp ?
                                        formatDateTime(product.timestamp)
                                        : 'Date not available'
                                    }
                                </span>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={handleUpvote}
                                    disabled={isOwner || isUpvoting}
                                    className={`btn btn-lg ${hasUpvoted ? 'btn-success' : 'btn-outline'} 
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
            </div>

            {/* Post Review Section */}
            <div className="mb-8 rounded-xl border border-base-300 shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-base-100">
                    <h2 className="text-xl font-bold">Write a Review</h2>
                </div>
                
                <div className="p-6">
                    <form onSubmit={handleReviewSubmit} className="space-y-5">
                        <div className="flex items-center gap-4">
                            <img
                                src={user.photoURL}
                                alt={user.displayName}
                                className="w-12 h-12 object-cover rounded-full border-2 border-purple-200"
                            />
                            <div>
                                <p className="font-semibold text-base">{user.displayName}</p>
                                <div className="mt-2">
                                    <ReactStars
                                        value={rating}
                                        onChange={value => setRating(value)}
                                        size={24}
                                        isHalf={true}
                                        primaryColor="#7e22ce"
                                        className="flex gap-1"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-200 outline-none transition-all resize-none"
                            placeholder="Share your thoughts about this product..."
                            required
                        />
                        
                        <button
                            type="submit"
                            className="btn bg-purple-500 text-white"
                        >
                            Post Review
                        </button>
                    </form>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="rounded-xl border border-gray-300 shadow-md  overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                    <FaRegComment className="text-purple-500" />
                    <h2 className="text-xl font-bold">Customer Reviews</h2>
                </div>
                
                <div className="p-6">
                    <div className="grid grid-cols-1 gap-6">
                        {reviews.length > 0 ? (
                            reviews
                            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                            .map((review, index) => (
                                <div 
                                    key={index} 
                                    className="p-5 rounded-lg bg-gray-50 border border-gray-100 hover:shadow-md transition-all duration-300"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <img
                                            src={review.reviewerImage}
                                            alt={review.reviewerName}
                                            className="w-12 h-12 rounded-full border-2 border-purple-200"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <h3 className="font-semibold text-gray-800">{review.reviewerName}</h3>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(review.timestamp).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <ReactStars
                                                value={review.rating}
                                                isEdit={false}
                                                size={16}
                                                isHalf={true}
                                                primaryColor="#7e22ce"
                                                className="flex gap-1 mt-1"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{review.description}</p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                Be the first to review this product!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;