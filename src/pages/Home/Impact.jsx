import React from 'react';
import { motion } from 'framer-motion';

const Impact = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-base-200 via-base-100 to-base-200">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
                    <p className="text-base-content/70 max-w-3xl mx-auto">
                        We measure our success by the connections we foster and the growth we enable.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7, staggerChildren: 0.1 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <MetricCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>}
                        metric="$15.2M"
                        description="Funding raised by launched products"
                        gradient="from-blue-500 to-indigo-600"
                    />

                    <MetricCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>}
                        metric="340+"
                        description="Independent creators supported"
                        gradient="from-purple-500 to-pink-600"
                    />

                    <MetricCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>}
                        metric="78%"
                        description="Of products improved based on feedback"
                        gradient="from-green-500 to-teal-600"
                    />

                    <MetricCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>}
                        metric="25,000+"
                        description="Feature requests implemented"
                        gradient="from-orange-500 to-red-600"
                    />
                </motion.div>
            </div>
        </section>
    );
};

const MetricCard = ({ icon, metric, description, gradient }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-base-100 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>

            <div className="p-8 relative z-10">
                <div className={`w-16 h-16 mb-6 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${gradient}`}>
                    {icon}
                </div>
                <h3 className="text-3xl font-bold mb-1">{metric}</h3>
                <p className="text-base-content/70">{description}</p>
            </div>

            {/* Decorative Element */}
            <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br ${gradient} opacity-20`}></div>
        </motion.div>
    );
};

export default Impact;