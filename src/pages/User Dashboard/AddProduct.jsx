import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Tag } from 'lucide-react';
import useAuth from "../../hooks/useAuth"
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Helmet } from 'react-helmet-async';

const AddProduct = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [isLoading, setIsLoading] = useState(false);
    const [userStatus, setUserStatus] = useState(null);
    const [tags, setTags] = useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [currentTag, setCurrentTag] = useState('');

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        defaultValues: {
            ownerName: user?.displayName || '',
            ownerEmail: user?.email || '',
            ownerImage: user?.photoURL || '',
            tags: [],
            productImage: null
        }
    });

    // Check user's membership status
    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                const response = await axiosPublic.get(`/users/${user?.email}`);
                setUserStatus(response.data);
            } catch (error) {
                console.error('Error fetching user status:', error);
            }
        };

        if (user?.email) {
            checkUserStatus();
        }
    }, [user, axiosPublic]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddTag = () => {
        if (currentTag.trim() && !tags.includes(currentTag.trim())) {
            const newTags = [...tags, currentTag.trim()];
            setTags(newTags);
            setValue('tags', newTags);
            setCurrentTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        const newTags = tags.filter(tag => tag !== tagToRemove);
        setTags(newTags);
        setValue('tags', newTags);
    };

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);

            // First upload the image to ImgBB
            const imageFile = { image: data.productImage[0] };
            const imgbbFormData = new FormData();
            imgbbFormData.append('image', data.productImage[0]);

            const imgbbResponse = await axiosPublic.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`,
                imgbbFormData
            );

            if (imgbbResponse.data.success) {
                const productItem = {
                    productName: data.productName,
                    productImage: imgbbResponse.data.data.display_url,
                    description: data.description,
                    ownerName: user.displayName,
                    ownerImage: user.photoURL,
                    ownerEmail: user.email,
                    externalLink: data.externalLink,
                    tags: tags,
                    status: 'pending',
                    upvotes: 0,
                    timestamp: new Date().toISOString(),
                };

                const productRes = await axiosPublic.post('/products', productItem);
                
                if (productRes.data.insertedId) {
                    reset();
                    setPreviewImage('');
                    setTags([]);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${data.productName} added successfully!`,
                        text: "Your product is pending moderator approval",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    setTimeout(() => {
                        navigate('/dashboard/myProducts');
                    }, 2000);
                }
            }
        } catch (error) {
            if (error.response?.status === 403) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Product Limit Reached',
                    text: 'Free users can only add one product. Would you like to upgrade to premium?',
                    showCancelButton: true,
                    confirmButtonText: 'Upgrade Now',
                    cancelButtonText: 'Maybe Later'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/dashboard/payment');
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to add product. Please try again.'
                });
            }
            console.error('Error adding product:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-6">
            <Helmet>
                <title>Add Product | Tech Hunt</title>
            </Helmet>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body p-6 md:p-8">
                    <h2 className="text-3xl font-bold text-center mb-5 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Add New Product</h2>

                    {/* Membership Status Warning */}
                    {(!userStatus?.membershipStatus || userStatus.membershipStatus !== 'active') && (
                        <div className="alert alert-warning shadow-lg mb-6">
                            <div className="flex items-center gap-2">
                                <Tag className="h-5 w-5" />
                                <div>
                                    <span className="font-medium">Free User Notice:</span> You can add only one product.
                                    <button 
                                        className="btn btn-link btn-sm"
                                        onClick={() => navigate('/dashboard/payment')}
                                    >
                                        Upgrade to Premium
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Product Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Product Name</span>
                                <span className="label-text-alt text-base-content/70">(Required)</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter product name"
                                className="input input-bordered w-full"
                                {...register('productName', { required: true })}
                            />
                            {errors.productName && (
                                <span className="text-error text-sm mt-1">Product name is required</span>
                            )}
                        </div>

                        {/* Product Image */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Product Image</span>
                                <span className="label-text-alt text-base-content/70">(Required)</span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                className="file-input file-input-bordered w-full"
                                {...register('productImage', { required: true })}
                                onChange={handleImageChange}
                            />
                            {errors.productImage && (
                                <span className="text-error text-sm mt-1">Product image is required</span>
                            )}
                            {previewImage && (
                                <div className="mt-4 flex justify-center">
                                    <img 
                                        src={previewImage} 
                                        alt="Preview" 
                                        className="w-40 h-40 object-cover rounded-lg shadow-md" 
                                    />
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Description</span>
                                <span className="label-text-alt text-base-content/70">(Required)</span>
                            </label>
                            <div className="relative">
                                <textarea
                                    required
                                    className="textarea textarea-bordered min-h-[120px] w-full focus:bg-base-100 pr-4 text-base"
                                    placeholder="Describe your product in detail..."
                                    {...register('description')}
                                />
                            </div>
                        </div>

                        {/* Owner Info Section */}
                        <div className="bg-gradient-to-r from-base-200 to-base-200/50 rounded-xl p-6 shadow-sm backdrop-blur-sm">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                <div className="relative">
                                    {user?.photoURL ? (
                                        <div className="avatar online">
                                            <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-md">
                                                <img src={user.photoURL} alt="Owner" className="object-cover" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="avatar placeholder">
                                            <div className="w-20 rounded-full bg-neutral-focus text-neutral-content ring ring-primary ring-offset-base-100 ring-offset-2">
                                                <span className="text-2xl">{user?.displayName?.charAt(0) || 'U'}</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="badge badge-primary badge-sm absolute -top-2 right-0">Owner</div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xl font-semibold">{user?.displayName}</h3>
                                        {/* <div className="badge badge-ghost badge-sm">Verified</div> */}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-base-content/70">
                                            Email:
                                            <span>{user?.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-base-content/70">

                                            <span className="text-sm">Product Owner</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Tags</span>
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={currentTag}
                                    onChange={(e) => setCurrentTag(e.target.value)}
                                    placeholder="Add tags..."
                                    className="input input-bordered flex-1"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddTag();
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    className="btn bg-purple-500 text-white"
                                    onClick={handleAddTag}
                                >
                                    Add Tag
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags.map((tag, index) => (
                                    <div key={index} className="badge badge-primary gap-2">
                                        {tag}
                                        <button
                                            type="button"
                                            className="btn btn-ghost btn-xs"
                                            onClick={() => handleRemoveTag(tag)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* External Link */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">External Link</span>
                                <span className="label-text-alt text-base-content/70">(Optional)</span>
                            </label>
                            <input
                                type="url"
                                placeholder="https://example.com"
                                className="input input-bordered w-full"
                                {...register('externalLink', {
                                    pattern: {
                                        value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                        message: "Please enter a valid URL"
                                    }
                                })}
                            />
                            {errors.externalLink && (
                                <span className="text-error text-sm mt-1">{errors.externalLink.message}</span>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Processing...
                                </>
                            ) : (
                                'Add Product'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;