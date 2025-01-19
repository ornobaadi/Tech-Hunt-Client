import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import FeaturedProducts from "./FeaturedProducts";
import TrendingProducts from "./TrendingProducts";
import CouponBanner from "./CouponBanner";

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
                <CouponBanner></CouponBanner>
            </div>
        </div>
    );
};

export default Home;