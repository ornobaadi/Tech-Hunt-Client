import banner from "../../assets/banner.png";

const Banner = () => {
    return (
        <div>
            <div
                className="hero min-h-[600px] rounded-xl my-2"
                style={{
                    backgroundImage: `url(${banner})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="hero-overlay rounded-2xl bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-4xl font-bold">
                            Discover & Share the Best Products in Tech
                        </h1>
                        <p className="mb-5">
                            Explore trending innovations, upvote your favorites, and connect with creators driving the future of technology.
                        </p>
                        <button className="btn btn-primary">Start Exploring</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
