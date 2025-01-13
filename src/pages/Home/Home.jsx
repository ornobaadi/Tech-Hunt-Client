import Banner from "./Banner";
import FeaturedProducts from "./FeaturedProducts";
import TrendingProducts from "./TrendingProducts";

const Home = () => {
    return (
        <div>
            <div>
                <Banner></Banner>
                <FeaturedProducts></FeaturedProducts>
                <TrendingProducts></TrendingProducts>
            </div>
        </div>
    );
};

export default Home;