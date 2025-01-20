import { Link } from "react-router-dom";
import banner from "../../assets/banner.jpg";

const Banner = () => {
    return (
        <div>
            <div
                className="hero min-h-[500px] lg:min-h-[700px] rounded-md my-2"
                style={{
                    backgroundImage: `url(${banner})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="hero-overlay rounded-2xl bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-2xl md:text-4xl font-bold">
                            Discover & Share the Best Products in Tech
                        </h1>
                        <p className="mb-10">
                            Explore trending innovations, upvote your favorites, and connect with creators driving the future of technology.
                        </p>
                        <Link to="/products" className="bg-gradient-to-br from-[#C836E9] to-[#080DAF] text-white font-bold py-3 px-4 rounded-sm shadow-lg hover:from-[#D550F2] hover:to-[#1A1BD0]">Start Exploring</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
