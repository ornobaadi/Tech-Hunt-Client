import { useState } from "react";
import { Link } from "react-router-dom";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple email validation
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        // Here you would typically send the email to your backend
        console.log("Email submitted:", email);

        // Show success state
        setIsSubmitted(true);
        setError("");
        setEmail("");

        // Reset success message after 5 seconds
        setTimeout(() => {
            setIsSubmitted(false);
        }, 5000);
    };

    return (
        <section className="py-20 bg-gradient-to-r from-primary/20 to-secondary/20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Newsletter</h2>
                <p className="text-lg text-base-content/80 max-w-2xl mx-auto mb-8">
                    Stay updated with the latest tech discoveries, product launches, and community events. Be the first to know about tomorrow's tech today.
                </p>

                <div className="max-w-md mx-auto">
                    {isSubmitted ? (
                        <div className="bg-success text-white p-4 rounded-lg mb-6">
                            <p className="font-medium">Thank you for subscribing!</p>
                            <p className="text-sm mt-1">We'll keep you updated with the latest Tech Hunt news.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 mb-4">
                            <div className="flex-grow">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-label="Email address"
                                />
                                {error && <p className="text-error text-sm mt-1 text-left">{error}</p>}
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Subscribe
                            </button>
                        </form>
                    )}


                    <p className="text-xs text-base-content/60 mt-6">
                        By subscribing, you agree to our Privacy Policy and Terms of Service.
                        We respect your privacy and will never share your information.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;