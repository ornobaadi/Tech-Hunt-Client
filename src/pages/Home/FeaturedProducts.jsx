import ProductItem from "../Shared/ProductItem";
import useProducts from "../../hooks/useProducts";

const FeaturedProducts = () => {
    const [products] = useProducts();
    const featured = products.filter(products => products.category === 'featured')


    return (
        <div>
            <div className="container mx-auto text-center mb-12">
                <h4 className="btn pointer-events-none text-purple-500 uppercase text-sm font-bold my-5">Featured</h4>
                <h2 className="text-2xl lg:text-4xl font-bold text-base-content">Featured Products</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 container mx-auto">
                {featured.map((product) => <ProductItem
                key={product.id}
                product={product}
                ></ProductItem>
                )}
            </div>
        </div>
    );
};

export default FeaturedProducts;