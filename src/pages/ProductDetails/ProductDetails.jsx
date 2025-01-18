import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaCircleChevronUp } from "react-icons/fa6";
import ReactStars from 'react-awesome-stars-rating';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUpvote from '../../hooks/useUpvote';
import useProducts from '../../hooks/useProducts';
import Swal from 'sweetalert2';
import { GrShare } from "react-icons/gr";

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

    const handleUpvote = () => {
        const existingUpvote = upvote.find(item => item.productId === id);

        if (existingUpvote) {
            axiosSecure.delete(`/upvotes/${existingUpvote._id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        setCurrentUpvotes(prev => prev - 1);
                        refetch();
                        refetchProducts();
                    }
                });
        } else {
            const upvoteItem = {
                productId: id,
                email: user.email,
                productName: product.productName,
                productImage: product.productImage,
            }
            axiosSecure.post('/upvotes', upvoteItem)
                .then(res => {
                    if (res.data.insertedId) {
                        setCurrentUpvotes(prev => prev + 1);
                        refetch();
                        refetchProducts();
                    }
                });
        }
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
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
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
                    productTimestamp: product.createdAt, // Use the product's creation date
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

    const hasUpvoted = upvote.some(item => item.productId === id);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    if (!product) {
        return <div className="text-center py-10">Product not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Product Details Section */}
            <div className="rounded-lg shadow-xl p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <img
                        src={product.productImage}
                        alt={product.productName}
                        className="h-40 w-40 md:w-80 md:h-80  object-cover rounded-lg"
                    />
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
                        </div>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {product.tags.map((tag, index) => (
                                <span key={index} className="badge badge-outline badge-primary">{tag}</span>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                            Added on: {product.timestamp ?
                                new Date(product.timestamp).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })
                                : 'Date not available'
                            }
                        </p>
                        <div className="flex gap-4 mb-4">
                            <a
                                href={product.externalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary gap-3"
                            >
                                Visit Website <GrShare />
                            </a>
                            <button
                                onClick={handleReport}
                                className="btn btn-error text-white"
                            >
                                Report
                            </button>
                        </div>
                        <button
                            onClick={handleUpvote}
                            className={`btn btn-lg ${hasUpvoted ? 'btn-success' : 'btn-outline'} flex items-center gap-2`}
                        >
                            <FaCircleChevronUp />
                            {currentUpvotes}
                        </button>
                    </div>
                </div>
            </div>

            {/* Post Review Section */}
            <div className="rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-6">Write a Review</h2>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="flex items-center gap-4">
                        <img
                            src={user.photoURL}
                            alt={user.displayName}
                            className="w-12 h-12 rounded-full border-2 border-purple-600"
                        />
                        <div>
                            <p className="font-semibold text-lg">{user.displayName}</p>
                            <div className="mt-2">
                                <ReactStars
                                    value={rating}
                                    onChange={value => setRating(value)}
                                    size={24}
                                    isHalf={true}
                                    primaryColor="#FFB800"
                                    className="flex gap-1"
                                />
                            </div>
                        </div>
                    </div>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="textarea textarea-bordered w-full h-32 focus:border-primary mt-3"
                        placeholder="Share your thoughts about this product..."
                        required
                    />
                    <button
                        type="submit"
                        className="btn btn-primary w-full md:w-auto"
                    >
                        Post Review
                    </button>
                </form>
            </div>

            {/* Reviews Section */}
            <div className="rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                <div className="grid grid-cols-1 gap-6">
                    {reviews
                        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                        .map((review, index) => (
                            <div key={index} className="rounded-lg p-6 border border-base-300 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={review.reviewerImage}
                                        alt={review.reviewerName}
                                        className="w-16 h-16 rounded-full border-2 border-purple-600"
                                    />
                                    <div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-2">{review.reviewerName}</h3>
                                            <ReactStars
                                                value={review.rating}
                                                isEdit={false}
                                                size={16}
                                                isHalf={true}
                                                primaryColor="#FFB800"
                                                className="flex gap-1"
                                            />
                                        </div>
                                        <div className="mt-1">

                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500 ml-auto">
                                        {new Date(review.timestamp).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="ml-20">{review.description}</p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;