import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProductReviewQueue = () => {
    const axiosSecure = useAxiosSecure();
    const { data: products = [], refetch } = useQuery({
        queryKey: ['review-queue'],
        queryFn: async () => {
            const res = await axiosSecure.get('/products/review-queue');
            return res.data.sort((a, b) => {
                // Ensure products with no status or 'pending' status come first
                const statusA = a.status || 'pending';
                const statusB = b.status || 'pending';

                // If one is pending and the other isn't, pending should come first
                if (statusA === 'pending' && statusB !== 'pending') return -1;
                if (statusA !== 'pending' && statusB === 'pending') return 1;

                // If both are non-pending, sort by timestamp if available
                if (a.timestamp && b.timestamp) {
                    return new Date(b.timestamp) - new Date(a.timestamp);
                }

                // If no timestamp, maintain current order
                return 0;
            });
        }
    });

    const handleAccept = async (id) => {
        try {
            await axiosSecure.patch(`/products/status/${id}`, {
                status: 'accepted'
            });
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Product Accepted",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        } catch (error) {
            console.error('Error accepting product:', error);
            Swal.fire({
                icon: "error",
                title: "Operation Failed",
                text: "Could not accept the product",
            });
        }
    };

    const handleReject = async (id) => {
        try {
            await axiosSecure.patch(`/products/status/${id}`, {
                status: 'rejected',
                featured: false // Remove featured status when rejecting
            });
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Product Rejected",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        } catch (error) {
            console.error('Error rejecting product:', error);
            Swal.fire({
                icon: "error",
                title: "Operation Failed",
                text: "Could not reject the product",
            });
        }
    };

    const handleToggleFeatured = async (id, currentFeatured) => {
        try {
            await axiosSecure.patch(`/products/status/${id}`, {
                featured: !currentFeatured
            });
            Swal.fire({
                position: "center",
                icon: "success",
                title: currentFeatured ? "Product unfeatured" : "Product marked as featured",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        } catch (error) {
            console.error('Error updating featured status:', error);
            Swal.fire({
                icon: "error",
                title: "Operation Failed",
                text: "Could not update featured status",
            });
        }
    };

    return (
        <div className="w-full p-4">
            <h2 className="text-3xl font-bold text-center my-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Product Review Queue</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>

                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id}
                                className={product.status === 'pending' ? 'bg-base-200' : ''}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={product.productImage} alt={product.productName} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{product.productName}</div>
                                            <div className="text-sm opacity-50">
                                                by {product.ownerName}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td className="flex gap-2">
                                    <Link to={`/product/${product._id}`}>
                                        <button className="btn btn-sm btn-info">
                                            View Details
                                        </button>
                                    </Link>
                                    {product.status === 'accepted' && (
                                        <button
                                            onClick={() => handleToggleFeatured(product._id, product.featured)}
                                            className={`btn btn-sm ${product.featured ? 'btn-secondary' : 'btn-warning'}`}
                                        >
                                            {product.featured ? 'Unfeature' : 'Make Featured'}
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleAccept(product._id)}
                                        className="btn btn-sm btn-success"
                                        disabled={product.status === 'accepted'}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleReject(product._id)}
                                        className="btn btn-sm btn-error"
                                        disabled={product.status === 'rejected'}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {products.length === 0 && (
                <div className="text-center mt-8">
                    <p className="text-xl text-gray-500">No products in review queue</p>
                </div>
            )}
        </div>
    );
};

export default ProductReviewQueue;