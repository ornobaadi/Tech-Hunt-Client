import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CouponsPage = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const response = await fetch("https://tech-hunt-server-two.vercel.app/coupons");
                const data = await response.json();
                setCoupons(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching coupons:", error);
                setLoading(false);
            }
        };

        fetchCoupons();
    }, []);

    if (loading) return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <span className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-700 font-medium text-sm mb-4">
                    EXCLUSIVE OFFERS
                </span>
                <h1 className="text-3xl md:text-4xl font-bold">Available Coupons</h1>
                <p className="text-base-content/70 mt-3 max-w-lg mx-auto">
                    Use these coupons during checkout to get amazing discounts on our products
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coupons.map((coupon) => (
                    <motion.div
                        key={coupon.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-base-100 rounded-xl shadow-md overflow-hidden border border-base-200 hover:shadow-lg transition-shadow"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="p-2 rounded-full bg-primary/10 text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                    </span>
                                    <h2 className="text-xl font-bold tracking-tight">{coupon.code}</h2>
                                </div>
                                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                                    {coupon.discountAmount}% OFF
                                </span>
                            </div>
                            
                            <div className="space-y-3 mb-6">
                                <p className="text-base-content/80 text-sm">
                                    {coupon.description}
                                </p>
                                <div className="flex items-center text-sm text-base-content/60">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Valid until: {new Date(coupon.expiryDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div 
                                    className="relative group cursor-pointer select-none"
                                    onClick={() => {
                                        navigator.clipboard.writeText(coupon.code);
                                        // Could add toast notification here
                                    }}
                                >
                                    <span className="text-sm font-medium text-primary">Click to copy</span>
                                    <span className="absolute -top-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs px-2 py-1 rounded">
                                        Copy code
                                    </span>
                                </div>
                                <Link
                                    to={`/dashboard/payment?coupon=${coupon.code}`}
                                    className="btn btn-primary btn-sm"
                                >
                                    Use Now
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {coupons.length === 0 && (
                <div className="text-center py-16">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <h3 className="mt-4 text-xl font-medium">No Coupons Available</h3>
                    <p className="mt-2 text-base-content/60">Check back later for exclusive deals and offers.</p>
                </div>
            )}
        </div>
    );
};

export default CouponsPage;