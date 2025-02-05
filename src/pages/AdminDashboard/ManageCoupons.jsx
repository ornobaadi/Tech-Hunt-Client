import { useState, useEffect } from 'react';
import { Calendar, Tag, Trash2, Plus, Edit2 } from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const ManageCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
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
            setCoupons(Array.isArray(response.data) ? response.data : []);
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
            setError(null);
            if (isEditing) {
                await axiosSecure.patch(`/coupons/${formData._id}`, formData);
            } else {
                await axiosSecure.post('/coupons', formData);
            }
            await fetchCoupons();
            setIsAdding(false);
            setIsEditing(false);
            setFormData({
                code: '',
                expiryDate: '',
                description: '',
                discountAmount: ''
            });
        } catch (error) {
            setError(`Failed to ${isEditing ? 'update' : 'add'} coupon. Please try again.`);
        }
    };

    const handleEdit = (coupon) => {
        setFormData({
            _id: coupon._id,
            code: coupon.code,
            expiryDate: new Date(coupon.expiryDate).toISOString().split('T')[0],
            description: coupon.description,
            discountAmount: coupon.discountAmount
        });
        setIsEditing(true);
        setIsAdding(true);
    };

    const handleDelete = async (id) => {
        try {
            setError(null);
            await axiosSecure.delete(`/coupons/${id}`);
            await fetchCoupons();
        } catch (error) {
            setError('Failed to delete coupon. Please try again.');
        }
    };

    const isExpired = (expiryDate) => {
        return new Date(expiryDate) < new Date();
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <Helmet>
                <title>Manage Coupons | Tech Hunt</title>
            </Helmet>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Manage Coupons
                    </h2>
                </div>
                <button
                    onClick={() => {
                        setIsAdding(true);
                        setIsEditing(false);
                        setFormData({
                            code: '',
                            expiryDate: '',
                            description: '',
                            discountAmount: ''
                        });
                    }}
                    className="btn btn-primary btn-sm"
                >
                    <Plus size={20} /> Add New Coupon
                </button>
            </div>

            {/* Form */}
            {isAdding && (
                <div className="card bg-base-200 shadow-xl mb-8">
                    <div className="card-body">
                        <h3 className="card-title text-lg font-semibold mb-4">
                            {isEditing ? 'Edit Coupon' : 'Add New Coupon'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Coupon Code</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter coupon code"
                                        className="input input-bordered focus:input-primary"
                                        value={formData.code}
                                        onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Expiry Date</span>
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                        className="input input-bordered focus:input-primary"
                                        value={formData.expiryDate}
                                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Discount Amount (%)</span>
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        placeholder="Enter discount percentage"
                                        min="0"
                                        max="100"
                                        className="input input-bordered focus:input-primary"
                                        value={formData.discountAmount}
                                        onChange={(e) => setFormData({ ...formData, discountAmount: Math.min(100, Math.max(0, e.target.value)) })}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Description</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter coupon description"
                                        className="input input-bordered focus:input-primary"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsAdding(false);
                                        setIsEditing(false);
                                        setFormData({
                                            code: '',
                                            expiryDate: '',
                                            description: '',
                                            discountAmount: ''
                                        });
                                    }}
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    {isEditing ? 'Update Coupon' : 'Create Coupon'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Coupons Grid */}
            {coupons.length === 0 ? (
                <div className="text-center py-12 bg-base-200 rounded-lg">
                    <Tag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-xl opacity-70">No coupons available</p>
                    <p className="text-sm opacity-50 mt-2">
                        Start by creating your first coupon
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {coupons.map((coupon) => (
                        <div key={coupon._id}
                            className="relative bg-base-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg">
                            {/* Header with Discount and Actions */}
                            <div className="flex justify-between items-center bg-base-300 p-4">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-lg">
                                        <Tag className="h-5 w-5 text-primary" />
                                    </div>
                                    <h3 className="font-mono text-lg font-bold tracking-wide">
                                        {coupon.code}
                                    </h3>
                                </div>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => handleEdit(coupon)}
                                        className="btn btn-ghost btn-sm px-2 hover:bg-primary hover:text-white"
                                        title="Edit coupon"
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(coupon._id)}
                                        className="btn btn-ghost btn-sm px-2 hover:bg-error hover:text-white"
                                        title="Delete coupon"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="p-4">
                                {/* Discount Badge */}
                                <div className="inline-block bg-primary text-primary-content rounded-lg px-3 py-1 text-sm font-semibold mb-3">
                                    {coupon.discountAmount}% OFF
                                </div>

                                {/* Description */}
                                <p className="text-sm opacity-75 mb-4 line-clamp-2">
                                    {coupon.description}
                                </p>

                                {/* Expiry Date */}
                                <div className="flex items-center gap-2 text-sm opacity-70 mb-3">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
                                    </span>
                                </div>

                                {/* Status Bar */}
                                <div className="flex justify-between items-center text-sm border-t border-base-300 pt-3">
                                    <span className="opacity-70">Status</span>
                                    <span className={`badge ${isExpired(coupon.expiryDate) ? 'badge-error' : 'badge-success'} badge-sm`}>
                                        {isExpired(coupon.expiryDate) ? 'Expired' : 'Active'}
                                    </span>
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