import { Helmet } from "react-helmet-async";
import useProducts from "../../hooks/useProducts";
import ProductItem from "../Shared/ProductItem";

const Products = () => {

    const [products] = useProducts();

    return (
        <div>
            <Helmet>
                <title>Products | Tech Hunt</title>
            </Helmet>
            <div className="container mx-auto text-center mb-12">
                <h4 className="btn pointer-events-none text-purple-500 uppercase text-sm font-bold my-5">All</h4>
                <h2 className="text-2xl lg:text-4xl font-bold text-base-content">All Products</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 container mx-auto">
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Products;