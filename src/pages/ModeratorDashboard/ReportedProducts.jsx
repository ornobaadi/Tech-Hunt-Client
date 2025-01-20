import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const ReportedProducts = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: reportedProducts = [], refetch, isLoading } = useQuery({
        queryKey: ['reported-products', user?.email],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get('/products/reported');
                return res.data;
            } catch (error) {
                console.error("Error fetching reported products:", error);
                throw error;
            }
        }
    });

    // Fetch report details for each product
    const { data: reports = [] } = useQuery({
        queryKey: ['reports'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get('/reports');
                return res.data;
            } catch (error) {
                console.error("Error fetching reports:", error);
                throw error;
            }
        }
    });

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/products/reported/${id}`);
                if (res.data.deletedCount > 0) {
                    await Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Product has been deleted!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            Swal.fire({
                icon: "error",
                title: "Operation Failed",
                text: "Could not delete the product",
            });
        }
    };

    const handleViewReports = async (productId) => {
        const productReports = reports.filter(report => report.productId === productId);

        if (productReports.length === 0) {
            Swal.fire({
                title: 'No Reports',
                text: 'No detailed reports found for this product.',
                icon: 'info'
            });
            return;
        }

        const reportsList = productReports.map(report => `
            <div class="mb-4 p-4 bg-gray-100 rounded">
                <p><strong>Reported By:</strong> ${report.reportedBy}</p>
                <p><strong>Reason:</strong> ${report.reason}</p>
                <p><strong>Date:</strong> ${new Date(report.timestamp).toLocaleString()}</p>
            </div>
        `).join('');

        await Swal.fire({
            title: 'Report Details',
            html: `<div class="max-h-[60vh] overflow-y-auto">${reportsList}</div>`,
            width: '600px',
            confirmButtonText: 'Close'
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="w-full p-4">
            <Helmet>
                <title>Tech Hunt | Reported Products</title>
            </Helmet>

            <div className="bg-base-100 p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center my-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Reported Products</h2>

                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead className="bg-base-200">
                            <tr>
                                <th>#</th>
                                <th>Product Info</th>
                                <th>Owner</th>
                                <th>Reports</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportedProducts.map((product, index) => (
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img
                                                        src={product.productImage}
                                                        alt={product.productName}
                                                        onError={(e) => {
                                                            e.target.src = 'https://placehold.co/100x100?text=No+Image';
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{product.productName}</div>
                                                <div className="text-sm opacity-70">
                                                    Reported: {reports.find(report => report.productId === product._id)?.timestamp
                                                        ? new Date(reports.find(report => report.productId === product._id).timestamp).toLocaleDateString()
                                                        : "Date not available"}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-semibold">{product.ownerName}</div>
                                        <div className="text-sm opacity-70">{product.ownerEmail}</div>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleViewReports(product._id)}
                                            className="btn btn-sm btn-info"
                                        >
                                            View Reports
                                        </button>
                                    </td>
                                    <td className="space-x-2">
                                        <Link to={`/product/${product._id}`}>
                                            <button className="btn btn-sm btn-primary">
                                                View Details
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="btn btn-sm btn-error text-white"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {reportedProducts.length === 0 && (
                    <div className="text-center py-8">
                        <h3 className="text-2xl font-semibold text-gray-500">
                            No reported products found
                        </h3>
                        <p className="text-gray-400 mt-2">
                            When users report products, they will appear here
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportedProducts;