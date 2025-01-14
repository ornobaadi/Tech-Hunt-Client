/* eslint-disable react/prop-types */
import { FaCircleChevronUp } from "react-icons/fa6";
import { GrShare } from "react-icons/gr";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUpvote from "../../hooks/useUpvote";


const ProductItem = ({ product }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { _id, productImage, productName, externalLink, tags, ownerName, description, upvotes } = product;
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();
    const [, refetch] = useUpvote();


    const handleUpvote = () => {
        if (user && user.email) {
            // send upvote to db 
            const upvoteItem = {
                productId: _id,
                email: user.email,
                productName,
                productImage,
            }
            axiosSecure.post('/upvotes', upvoteItem)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${productName} upvoted`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refetch the upvote 
                        refetch();
                    }
                })

        }
        else {
            Swal.fire({
                title: "Login Required",
                text: "Please login to upvote this tech!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    // send the user to login page
                    navigate('/login', { state: { from: location } })
                }
            });
        }

    }
    return (
        <div>
            <div
                className="flex gap-4 p-5 bg-base-100  shadow-md rounded-lg hover:shadow-lg transition-shadow">
                <img
                    src={productImage}
                    alt={productName}
                    className="w-12 h-12 lg:w-24 lg:h-24 rounded-md object-fill"
                />
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <Link className="text-lg font-bold hover:underline text-base-content">{productName} </Link>
                        <a href={externalLink}
                            className="hover:text-purple-700"
                            target="_blank"
                            rel="noopener noreferrer">
                            <GrShare />
                        </a>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="badge cursor-pointer badge-outline badge-primary text-xs"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <span className="text-xs text-gray-500">
                        Owned by {ownerName}
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleUpvote}
                        className={`btn btn-success flex items-center gap-2`}>
                        <FaCircleChevronUp />
                        {upvotes}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;