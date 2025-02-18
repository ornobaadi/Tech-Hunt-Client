import { useState, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from 'react-hot-toast';
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mongoUser, setMongoUser] = useState(null);
    const axiosPublic = useAxiosPublic();
    
    const [formData, setFormData] = useState({
        name: user?.displayName || "",
        photoURL: user?.photoURL || ""
    });

    // Fetch user data from MongoDB on component mount
    useEffect(() => {
        const fetchMongoUser = async () => {
            try {
                const response = await axiosPublic.get(`/users/${user?.email}`);
                setMongoUser(response.data);
                if (response.data) {
                    setFormData({
                        name: response.data.name || user?.displayName || "",
                        photoURL: response.data.photoURL || user?.photoURL || ""
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (user?.email) {
            fetchMongoUser();
        }
    }, [user, axiosPublic]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubscribe = () => {
        navigate('/dashboard/payment');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await updateUserProfile(formData.name, formData.photoURL);
            
            const updatedUserData = {
                name: formData.name,
                photoURL: formData.photoURL,
                email: user.email,
                lastUpdated: new Date()
            };

            if (mongoUser) {
                await axiosPublic.patch(`/users/${user.email}`, updatedUserData);
            } else {
                await axiosPublic.post('/users', updatedUserData);
            }
            
            toast.success('Profile updated successfully!');
            setIsEditing(false);
            
            const response = await axiosPublic.get(`/users/${user.email}`);
            setMongoUser(response.data);
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="flex flex-col items-center py-12">
            <Helmet>
                <title>My Profile | Tech Hunt</title>
            </Helmet>
            <div className="w-full max-w-lg rounded-xl shadow-lg border border-slate-400 overflow-hidden">
                {/* Profile Header */}
                <div className="flex flex-col items-center p-8 space-y-4">
                    {user?.photoURL ? (
                        <img
                            src={isEditing ? formData.photoURL : (mongoUser?.photoURL || user.photoURL)}
                            alt="User"
                            className="w-28 h-28 rounded-full object-cover border-4 border-blue-300 shadow-lg"
                        />
                    ) : (
                        <div className="w-28 h-28 rounded-full border-4 border-blue-300 shadow-lg"></div>
                    )}
                    <h1 className="text-3xl font-semibold">
                        Welcome, {isEditing ? formData.name : (mongoUser?.name || user?.displayName || "Guest")}!
                    </h1>
                    <p className="text-sm">{user?.email}</p>
                    
                    {/* Membership Status and Subscribe Button */}
                    <div className="flex flex-col items-center space-y-2 mt-4">
                        {mongoUser?.membershipStatus === 'active' ? (
                            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
                                <Shield className="w-5 h-5" />
                                <span className="font-medium">Premium Member</span>
                            </div>
                        ) : (
                            <>
                                <div className="px-4 py-1 border border-gray-400 rounded-full text-sm">
                                    Free Member
                                </div>
                                <button
                                    onClick={handleSubscribe}
                                    className="px-6 py-2 cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-md"
                                >
                                    Subscribe for $50
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Profile Form */}
                <div className="px-8 py-6">
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">
                                    Photo URL
                                </label>
                                <input
                                    type="text"
                                    name="photoURL"
                                    value={formData.photoURL}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex gap-4 justify-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormData({
                                            name: mongoUser?.name || user?.displayName || "",
                                            photoURL: mongoUser?.photoURL || user?.photoURL || ""
                                        });
                                    }}
                                    className="btn"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-info"
                                    disabled={loading}
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium">Your Profile Information</h3>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex justify-between">
                                        <span>Name:</span>
                                        <span>
                                            {mongoUser?.name || user?.displayName || "Not provided"}
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Email:</span>
                                        <span>{user?.email}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Last Updated:</span>
                                        <span>
                                            {mongoUser?.lastUpdated 
                                                ? formatDate(mongoUser.lastUpdated)
                                                : "Never"}
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Membership Status:</span>
                                        <span className={mongoUser?.membershipStatus === 'active' ? 'text-green-600 font-medium' : ''}>
                                            {mongoUser?.membershipStatus === 'active' ? 'Premium' : 'Free Plan'}
                                        </span>
                                    </li>
                                    {mongoUser?.membershipStatus === 'active' && (
                                        <li className="flex justify-between">
                                            <span>Member Since:</span>
                                            <span>{formatDate(mongoUser.subscriptionDate)}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="text-center">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="btn btn-info"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;