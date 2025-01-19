import { useState, useEffect } from 'react';
import { Calendar, Percent, Tag, Trash2, Plus } from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxiosSecure'; // Adjust the path as needed

const ManageCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [formData, setFormData] = useState({
        code: '',
        expiryDate: '',
        description: '',
        discountAmount: ''
    });

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axiosSecure.get('/coupons');
            if (Array.isArray(response.data)) {
                setCoupons(response.data);
            } else {
                setCoupons([]);
                console.error('Expected array but got:', typeof response.data);
            }
        } catch (error) {
            console.error('Error fetching coupons:', error);
            setError('Failed to load coupons. Please try again later.');
            setCoupons([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosSecure.post('/coupons', formData);
            fetchCoupons();
            setIsAdding(false);
            setFormData({ code: '', expiryDate: '', description: '', discountAmount: '' });
        } catch (error) {
            console.error('Error adding coupon:', error);
            setError('Failed to add coupon. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosSecure.delete(`/coupons/${id}`);
            fetchCoupons();
        } catch (error) {
            console.error('Error deleting coupon:', error);
            setError('Failed to delete coupon. Please try again.');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Coupons</h2>
                <button
                    onClick={() => setIsAdding(true)}
                    className="btn btn-primary btn-sm flex items-center gap-2"
                >
                    <Plus size={20} /> Add New Coupon
                </button>
            </div>

            {error && (
                <div className="alert alert-error mb-4">
                    <span>{error}</span>
                </div>
            )}

            {isAdding && (
                <div className="card bg-base-100 shadow-xl mb-6">
                    <div className="card-body">
                        <h2 className="card-title">Add New Coupon</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Coupon Code</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="input input-bordered w-full"
                                        value={formData.code}
                                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Expiry Date</span>
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        className="input input-bordered w-full"
                                        value={formData.expiryDate}
                                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Discount Amount (%)</span>
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        max="100"
                                        className="input input-bordered w-full"
                                        value={formData.discountAmount}
                                        onChange={(e) => setFormData({ ...formData, discountAmount: e.target.value })}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="input input-bordered w-full"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsAdding(false)}
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Add Coupon
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {coupons.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-lg text-gray-500">No coupons available</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {coupons.map((coupon) => (
                        <div key={coupon._id} className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title flex items-center gap-2">
                                    <Tag className="h-5 w-5" />
                                    {coupon.code}
                                </h2>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-base-content/70">
                                        <Calendar className="h-4 w-4" />
                                        <span>Expires: {new Date(coupon.expiryDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-base-content/70">
                                        <Percent className="h-4 w-4" />
                                        <span>{coupon.discountAmount}% off</span>
                                    </div>
                                    <p className="text-sm text-base-content/60">{coupon.description}</p>
                                </div>
                                <div className="card-actions justify-end mt-4">
                                    <button
                                        onClick={() => handleDelete(coupon._id)}
                                        className="btn btn-error btn-sm btn-square"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageCoupons;