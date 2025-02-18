import { useState } from 'react';

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const testimonials = [
        {
            quote: "Tech Hunt helped my AI code assistant get 5,000 early users, which was crucial for collecting training data. This platform directly contributed to our $2M seed round.",
            name: "Alex Chen",
            role: "Founder, CodeBuddy AI",
            avatar: "https://randomuser.me/api/portraits/men/82.jpg"
        },
        {
            quote: "As an investor, Tech Hunt has become my secret weapon for spotting emerging tech trends before they hit mainstream. I've discovered three portfolio companies here.",
            name: "Sarah Williams",
            role: "Partner, FutureFund VC",
            avatar: "https://randomuser.me/api/portraits/women/79.jpg"
        },
        {
            quote: "I launched my accessibility tool on Tech Hunt and the community feedback transformed our product roadmap. Their feature suggestions were more valuable than months of internal planning.",
            name: "Marcus Johnson",
            role: "Creator, AccessifyWeb",
            avatar: "https://randomuser.me/api/portraits/men/29.jpg"
        }
    ];

    const nextSlide = () => {
        setActiveIndex((activeIndex + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-20 bg-base-200 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
                    <p className="text-base-content/70 max-w-3xl mx-auto">
                        Hear from the creators and community members who've experienced the Tech Hunt advantage.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -left-10 text-8xl text-primary opacity-20">"</div>
                    <div className="absolute -bottom-10 -right-10 text-8xl text-primary opacity-20">"</div>

                    {/* Carousel */}
                    <div className="relative overflow-hidden rounded-xl bg-base-100 shadow-lg">
                        <div
                            className="transition-transform duration-500 flex"
                            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="min-w-full p-8 md:p-12 flex flex-col items-center text-center">
                                    <blockquote className="text-lg md:text-xl italic mb-8 text-base-content/90">
                                        "{testimonial.quote}"
                                    </blockquote>
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="w-16 h-16 rounded-full border-4 border-primary/20 mb-4"
                                        />
                                        <div className="text-lg font-semibold">{testimonial.name}</div>
                                        <div className="text-sm text-base-content/60">{testimonial.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-base-200 text-primary hover:bg-primary hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-base-200 text-primary hover:bg-primary hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${index === activeIndex ? 'bg-primary' : 'bg-base-300'}`}
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;