/* eslint-disable react/prop-types */
import { FaCircleChevronUp } from "react-icons/fa6";

const ProductItem = ({ product }) => {

    const { productImage, productName, externalLink, tags, ownerName, description, upvotes } = product;

    return (
        <div>
            <div
                className="flex gap-4 p-5 bg-base-100 shadow-md rounded-lg hover:shadow-lg transition-shadow">
                <img
                    src={productImage}
                    alt={productName}
                    className="w-24 h-24 rounded-md object-fill"
                />
                <div className="flex-1">
                    <a href={externalLink} className="text-lg font-bold hover:underline text-base-content">
                        {productName}
                    </a>
                    <p className="text-sm text-gray-500 mb-3">{description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="badge badge-outline badge-primary text-xs"
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
                        className={`btn btn-primary flex items-center gap-2`}>
                        <FaCircleChevronUp />
                        {upvotes}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;