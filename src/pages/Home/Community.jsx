import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Community = () => {
    const [isVisible, setIsVisible] = useState({
        team: false
    });

    // Animation triggers based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll(".animate-section");
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const sectionId = section.getAttribute("data-id");
                if (sectionTop < window.innerHeight * 0.75) {
                    setIsVisible(prev => ({ ...prev, [sectionId]: true }));
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        // Trigger once on mount to check initial viewport elements
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section
            className="py-20 animate-section"
            data-id="team"
        >
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isVisible.team ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
                        <p className="text-base-content/70 max-w-3xl mx-auto">
                            Tech Hunt is built by and for technology enthusiasts, developers, designers, product managers, and curious minds.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Who's Tech Hunt For?</h3>
                            <div className="space-y-6">
                                <UserTypeItem
                                    icon={
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    }
                                    title="Developers & Creators"
                                    description="Launch your products to an engaged audience and receive valuable feedback"
                                />

                                <UserTypeItem
                                    icon={
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    }
                                    title="Early Adopters"
                                    description="Discover cutting-edge tools before they become mainstream"
                                />

                                <UserTypeItem
                                    icon={
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    }
                                    title="Investors & Industry Watchers"
                                    description="Spot emerging trends and promising startups before they break through"
                                />
                            </div>
                        </div>

                        <CommunityStats />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// Helper component for user types
const UserTypeItem = ({ icon, title, description }) => {
    return (
        <div className="flex gap-4">
            <div className="bg-primary/10 text-primary p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {icon}
                </svg>
            </div>
            <div>
                <h4 className="text-lg font-semibold mb-1">{title}</h4>
                <p className="text-base-content/70">{description}</p>
            </div>
        </div>
    );
};

// Helper component for stats
const CommunityStats = () => {
    const stats = [
        { value: "5,000+", label: "Active Users" },
        { value: "1,200+", label: "Products" },
        { value: "15,000+", label: "Reviews" },
        { value: "98%", label: "User Satisfaction" }
    ];

    return (
        <div className="bg-base-200 p-6 rounded-xl">
            <div className="bg-base-100 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-4">Community Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-base-200 p-4 rounded-lg text-center">
                            <div className="text-xl md:text-3xl font-bold text-purple-500 mb-1">{stat.value}</div>
                            <div className="text-xs text-base-content/70">{stat.label}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-6">
                    <Link to="/login" className="btn bg-purple-500 text-white w-full">Join Us Today</Link>
                </div>
            </div>
        </div>
    );
};

export default Community;