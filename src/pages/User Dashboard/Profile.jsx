import { useState, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from 'react-hot-toast';
import useAuth from "../../hooks/useAuth"
import { Helmet } from "react-helmet-async";

const Profile = () => {
    const { user, updateUserProfile } = useAuth()
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
                // Update form data with MongoDB data if available
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // Update profile in Firebase
            await updateUserProfile(formData.name, formData.photoURL);
            
            // Update in MongoDB
            const updatedUserData = {
                name: formData.name,
                photoURL: formData.photoURL,
                email: user.email,
                lastUpdated: new Date()
            };

            if (mongoUser) {
                // If user exists in MongoDB, update their data
                await axiosPublic.patch(`/users/${user.email}`, updatedUserData);
            } else {
                // If user doesn't exist in MongoDB, create new entry
                await axiosPublic.post('/users', updatedUserData);
            }
            
            toast.success('Profile updated successfully!');
            setIsEditing(false);
            
            // Refresh MongoDB user data
            const response = await axiosPublic.get(`/users/${user.email}`);
            setMongoUser(response.data);
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
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
                    <h1 className="text-3xl font-semibold ">
                        Welcome, {isEditing ? formData.name : (mongoUser?.name || user?.displayName || "Guest")}!
                    </h1>
                    <p className="text-sm ">{user?.email}</p>
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
                                    className="px-4 py-2 text-sm font-medium"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                                    disabled={loading}
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium ">Your Profile Information</h3>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex justify-between">
                                        <span className="">Name:</span>
                                        <span className="">
                                            {mongoUser?.name || user?.displayName || "Not provided"}
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="">Email:</span>
                                        <span className="">{user?.email}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="">Last Updated:</span>
                                        <span className="">
                                            {mongoUser?.lastUpdated 
                                                ? new Date(mongoUser.lastUpdated).toLocaleDateString()
                                                : "Never"}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="text-center">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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