import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import { Pagination, Autoplay, EffectCards } from "swiper/modules";
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
        <div className="min-h-[400px] flex items-center justify-center">
            <div className="relative">
                <span className="loading loading-bars loading-xl text-primary"></span>
                <span className="absolute top-full mt-4 font-medium text-base-content/70">Loading coupons...</span>
            </div>
        </div>
    );

    return (
        <section className="py-10 via-base-100 to-base-200 overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center my-6">
                        <h4 className="btn pointer-events-none text-purple-500 uppercase text-sm font-bold my-5">Coupons</h4>
                        <h2 className="text-2xl lg:text-4xl font-bold text-base-content">Exclusive Coupons</h2>
                    </div>
                    <p className="text-base-content/70 max-w-2xl mx-auto">
                        Unlock special discounts with these exclusive coupons designed specifically for Tech Hunt members.
                    </p>
                </motion.div>

                {/* Desktop view - Swiper */}
                <div className="hidden md:block">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1.2}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        loop={coupons.length > 3}
                        breakpoints={{
                            640: { slidesPerView: 1.5 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 3.5 },
                        }}
                        className="coupon-swiper pb-12"
                    >
                        {coupons.map((coupon) => (
                            <SwiperSlide key={coupon.id}>
                                <CouponCard coupon={coupon} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Mobile view - Cards effect */}
                <div className="md:hidden">
                    <Swiper
                        effect="cards"
                        grabCursor={true}
                        modules={[EffectCards]}
                        className="w-[300px] mx-auto h-[220px]"
                    >
                        {coupons.map((coupon) => (
                            <SwiperSlide key={coupon.id} className="rounded-xl overflow-hidden">
                                <CouponCard coupon={coupon} isMobile={true} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="text-center mt-10">
                    <Link to="/coupons" className="btn bg-purple-500 text-white btn-lg">
                        View All Subscription Plans
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

const CouponCard = ({ coupon, isMobile = false }) => {
    const daysRemaining = () => {
        const today = new Date();
        const expiry = new Date(coupon.expiryDate);
        const diffTime = expiry - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    const days = daysRemaining();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            className={`relative overflow-hidden rounded-xl ${isMobile ? 'h-full' : 'h-[220px]'}`}
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-primary to-purple-700"></div>

            {/* Radial pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

            {/* Discount badge */}
            <div className="absolute -right-10 top-7 rotate-45 bg-accent text-accent-content py-1 px-10 text-sm font-bold z-10">
                {coupon.discountAmount}% OFF
            </div>

            <div className="relative h-full p-6 flex flex-col justify-between z-10">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-white">{coupon.code}</h3>

                    </div>
                    <p className="text-white/80 text-sm mb-3">{coupon.description}</p>
                </div>

                <div className="mt-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                            <span className="text-xs font-medium px-2 py-1 bg-white/20 rounded-full text-white">
                                {days} days left
                            </span>
                        </div>

                        <Link
                            to={`/dashboard/payment?coupon=${coupon.code}`}
                            className="btn btn-sm btn-ghost bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                        >
                            Use Coupon
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Decorative circles */}
                <div className="absolute -left-4 -top-4 w-16 h-16 bg-white opacity-10 rounded-full"></div>
                <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-white opacity-5 rounded-full"></div>
            </div>
        </motion.div>
    );
};

export default CouponsPage;