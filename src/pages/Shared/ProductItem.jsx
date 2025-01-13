/* eslint-disable react/prop-types */
import { FaCircleChevronUp } from "react-icons/fa6";
import { GrShare } from "react-icons/gr";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {

    const { productImage, productName, externalLink, tags, ownerName, description, upvotes } = product;

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