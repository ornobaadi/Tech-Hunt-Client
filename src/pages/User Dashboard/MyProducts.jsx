import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from 'react-hook-form';
import { WithContext as ReactTags } from 'react-tag-input';

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [editingProduct, setEditingProduct] = useState(null);
    const [tags, setTags] = useState([]);
    const [previewImage, setPreviewImage] = useState('');

    const { register, handleSubmit, setValue, reset } = useForm();
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    useEffect(() => {
        const fetchUserProducts = async () => {
            if (user?.email) {
                try {
                    const response = await axiosSecure.get(`/products/user/${user.email}`);
                    setProducts(response.data);
                } catch (error) {
                    console.error('Error fetching user products:', error);
                    Swal.fire({
                        icon: "error",
                        title: "Failed to load products",
                        text: "Please try again later"
                    });
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUserProducts();
    }, [user?.email, axiosSecure]);

    const handleEdit = (product) => {
        setEditingProduct(product);
        setTags(product.tags?.map(tag => tag) || []);
        setPreviewImage(product.productImage);
        reset({
            productName: product.productName,
            description: product.description,
            externalLink: product.externalLink,
            tags: product.tags
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
            setValue('productImage', file);
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

    const handleUpdate = async (data) => {
        try {
            let imageUrl = editingProduct.productImage;

            // If a new image was uploaded, process it
            if (data.productImage?.[0]) {
                const imageFile = { image: data.productImage[0] };
                const imgbbRes = await axiosSecure.post(image_hosting_api, imageFile, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                });
                if (imgbbRes.data.success) {
                    imageUrl = imgbbRes.data.data.display_url;
                }
            }

            const updatedProduct = {
                productName: data.productName,
                productImage: imageUrl,
                description: data.description,
                externalLink: data.externalLink,
                tags: tags,
            };

            const result = await axiosSecure.patch(`/products/${editingProduct._id}`, updatedProduct);
            
            if (result.data.modifiedCount > 0) {
                setProducts(products.map(product => 
                    product._id === editingProduct._id 
                        ? { ...product, ...updatedProduct }
                        : product
                ));
                
                setEditingProduct(null);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product updated successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error updating product:', error);
            Swal.fire({
                icon: "error",
                title: "Failed to update product",
                text: "Please try again"
            });
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/products/${id}`);
                    if (res.data.deletedCount > 0) {
                        setProducts(products.filter(product => product._id !== id));
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your product has been deleted.",
                            icon: "success"
                        });
                    }
                } catch (error) {
                    console.error('Error deleting product:', error);
                    Swal.fire({
                        icon: "error",
                        title: "Delete Failed",
                        text: error.response?.data?.message || "Failed to delete product"
                    });
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            <div>
                <h2 className="text-3xl font-bold text-center my-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">My Products: {products.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Upvotes</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img src={product.productImage} alt={product.productName} />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h2>{product.productName}</h2>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <span className="badge badge-info">{product.upvotes || 0}</span>
                                    </div>
                                </td>
                                <td>
                                    <span className={`badge ${
                                        product.status === 'accepted' ? 'badge-success' :
                                        product.status === 'rejected' ? 'badge-error' :
                                        'badge-warning'
                                    }`}>
                                        {product.status || 'pending'}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="btn btn-warning btn-sm text-white"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="btn btn-error btn-sm text-white"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {editingProduct && (
                <dialog className="modal modal-bottom sm:modal-middle" open>
                    <div className="modal-box max-w-3xl">
                        <h3 className="font-bold text-lg mb-4">Edit Product</h3>
                        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
                            {/* Product Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Product Name</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    {...register('productName')}
                                />
                            </div>

                            {/* Product Image */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Product Image</span>
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="file-input file-input-bordered w-full"
                                    onChange={handleImageChange}
                                    {...register('productImage')}
                                />
                                {previewImage && (
                                    <div className="mt-2">
                                        <img src={previewImage} alt="Preview" className="w-40 h-40 object-cover rounded-lg" />
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Description</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered min-h-[120px]"
                                    {...register('description')}
                                ></textarea>
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
                                />
                            </div>

                            {/* External Link */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">External Link</span>
                                </label>
                                <input
                                    type="url"
                                    className="input input-bordered w-full"
                                    {...register('externalLink')}
                                />
                            </div>

                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                                <button 
                                    type="button" 
                                    className="btn" 
                                    onClick={() => setEditingProduct(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default MyProducts;