import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

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

    if (loading) return <div>Loading coupons...</div>;

    return (
        <div className="text-center my-12">
            <h4 className="btn pointer-events-none text-purple-500 uppercase text-sm font-bold my-5">Coupons</h4>
            <h2 className="text-2xl lg:text-4xl font-bold text-base-content mb-10">Available Coupons</h2>
            <Swiper
                modules={[Pagination]}
                spaceBetween={20}
                slidesPerView={1.2}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 1.5 },
                    768: { slidesPerView: 2 }, 
                    1024: { slidesPerView: 3.5 },
                }}
            >
                {coupons.map((coupon) => (
                    <SwiperSlide key={coupon.id}>
                        <div className="glass card bg-info-content text-primary-content shadow-lg mx-auto max-w-[90%] sm:max-w-xs md:max-w-sm">
                            <div className="card-body p-8">
                                <h2 className="card-title text-lg md:text-xl">{coupon.code}</h2>
                                <p className="text-sm md:text-base">
                                    <strong>Discount:</strong> {coupon.discountAmount}%
                                </p>
                                <p className="text-xs md:text-sm">{coupon.description}</p>
                                <p className="text-xs md:text-sm">
                                    <strong>Valid Till:</strong> {new Date(coupon.expiryDate).toLocaleDateString()}
                                </p>
                                <div className="card-actions justify-end">
                                    <Link
                                        to={`/dashboard/payment?coupon=${coupon.code}`}
                                        className="btn btn-soft btn-primary text-xs md:text-sm"
                                    >
                                        Use Coupon
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CouponsPage;
