import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import FeaturedProducts from "./FeaturedProducts";
import TrendingProducts from "./TrendingProducts";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Tech Hunt</title>
            </Helmet>
            <div>
                <Banner></Banner>
                <FeaturedProducts></FeaturedProducts>
                <TrendingProducts></TrendingProducts>
            </div>
        </div>
    );
};

export default Home;