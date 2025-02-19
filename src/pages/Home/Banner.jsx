import { Link } from "react-router-dom";
import banner from "../../assets/banner.jpg";
import { motion } from "framer-motion";

const Banner = () => {
    return (
        <div className="relative overflow-hidden my-6">
            <div
                className="hero min-h-[600px] lg:min-h-[80vh] rounded-xl relative"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url(${banner})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Modern geometric accent shapes */}
                <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-purple-500/20 blur-3xl rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 md:w-80 md:h-80 bg-blue-500/20 blur-3xl rounded-full -ml-20 -mb-20"></div>
                
                {/* Glass morphism overlay */}
                <div className="hero-overlay rounded-xl bg-black/40 backdrop-blur-[2px]"></div>
                
                <div className="hero-content text-white text-center z-10 px-6">
                    <motion.div 
                        className="max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="mb-8 text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                                Discover & Share
                            </span>
                            <br className="md:hidden" /> the Best in Tech
                        </h1>
                        
                        <p className="mb-10 md:text-lg lg:text-xl font-light max-w-xl mx-auto leading-relaxed opacity-90">
                            Explore trending innovations, upvote your favorites, and connect with creators driving the future of technology.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <Link 
                                to="/products" 
                                className="group relative px-7 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-medium text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Start Exploring
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                            
                            <Link 
                                to="/about" 
                                className="px-7 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg font-medium text-white transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:shadow-white/5"
                            >
                                Learn More
                            </Link>
                        </div>
                        
                        {/* Modern badge indicator */}
                        <div className="mt-16 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-sm font-medium">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            <span>800+ Products Available</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Banner;