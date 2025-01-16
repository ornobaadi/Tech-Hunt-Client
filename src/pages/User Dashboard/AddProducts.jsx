import React from 'react';
import { useForm } from 'react-hook-form';
import { WithContext as ReactTags } from 'react-tag-input';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const AddProducts = () => {
    const { user } = useAuth();
    const { register, handleSubmit, setValue, reset } = useForm({
        defaultValues: {
            ownerName: user?.displayName || '',
            ownerEmail: user?.email || '',
            ownerImage: user?.photoURL || '',
            tags: [],
            productImage: ''
        }
    });

    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const [tags, setTags] = React.useState([]);
    const [previewImage, setPreviewImage] = React.useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setValue('productImage', file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddTag = (tag) => {
        setTags([...tags, tag]);
        setValue('tags', [...tags, tag]);
    };

    const handleDeleteTag = (i) => {
        const newTags = tags.filter((_, index) => index !== i);
        setTags(newTags);
        setValue('tags', newTags);
    };


    const axiosPublic = useAxiosPublic();
    const onSubmit = async (data) => {
        console.log('Form submitted:', data);
        // image upload to imgbb then get url
        const imageFile = { image: data.productImage[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the product image url 
            const productItem = {
                productName: data.productName,
                productImage: res.data.data.display_url,
                description: data.description,
                ownerName: data.ownerName,
                ownerImage: data.ownerImage,
                ownerEmail: data.ownerEmail,
                externalLink: data.externalLink,
                tags: data.tags,
                upvotes: 0,
            };

            const productRes = await axiosPublic.post('/products', productItem);
            console.log(productRes.data);
            if (productRes.data.insertedId) {
                // show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.productName} added to Products`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
    };

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-6">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-center mb-8">Add New Product</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Product Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Product Name</span>
                                <span className="label-text-alt text-base-content/70">(Required)</span>
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="Enter product name"
                                className="input input-bordered w-full"
                                {...register('productName')}
                            />
                        </div>

                        {/* Product Image */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Product Image</span>
                                <span className="label-text-alt text-base-content/70">(Required)</span>
                            </label>
                            <input
                                required
                                type="file"
                                accept="image/*"
                                className="file-input file-input-bordered w-full"
                                onChange={handleImageChange}
                                {...register('productImage')}
                            />
                            {previewImage && (
                                <div className="mt-4 flex justify-center">
                                    <img src={previewImage} alt="Preview" className="w-40 h-40 object-cover rounded-lg shadow-md" />
                                </div>
                            )}
                        </div>

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
                                        <div className="badge badge-ghost badge-sm">Verified</div>
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
                            <ReactTags
                                tags={tags.map((tag, index) => ({
                                    id: index.toString(),
                                    text: tag
                                }))}
                                handleDelete={handleDeleteTag}
                                handleAddition={(tag) => handleAddTag(tag.text)}
                                inputFieldPosition="bottom"
                                classNames={{
                                    tags: 'flex flex-wrap gap-2 mt-2',
                                    tag: 'badge badge-primary badge-lg gap-2 mr-2',
                                    tagInput: 'input input-bordered w-full mt-2',
                                    remove: 'cursor-pointer hover:text-error'
                                }}
                                placeholder="Type and press enter to add tags"
                            />
                        </div>

                        {/* External Links */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">External Link</span>
                            </label>
                            <label className="input-group">
                                <input
                                    type="url"
                                    placeholder="https://example.com"
                                    className="input input-bordered w-full"
                                    {...register('externalLink', {
                                        pattern: {
                                            value: /^(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$/,
                                        }
                                    })}
                                />
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8">
                            <button type="submit" className="btn btn-primary w-full">
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProducts;