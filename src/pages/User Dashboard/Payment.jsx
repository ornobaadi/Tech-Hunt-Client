import { useState } from 'react';
import { CreditCard, CheckCircle2, Lock } from 'lucide-react';

const Payment = () => {
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const subscriptionAmount = 49.99;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate payment processing
        setTimeout(() => {
            setStep(2);
            setLoading(false);
        }, 2000);
    };

    const features = [
        "Unlimited product listings",
        "Verified member badge",
        "Early access to new products"
    ];

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-md mx-auto">
                <div className="card bg-base-100 shadow-xl">
                    {step === 1 ? (
                        <>
                            <div className="card-body">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="card-title text-2xl mb-2">Premium Membership</h2>
                                        <p className="text-base-content/70 text-sm">
                                            Upgrade to unlock all features
                                        </p>
                                    </div>
                                    <div className="badge badge-primary badge-lg gap-1">
                                        <Lock size={14} />
                                        Premium
                                    </div>
                                </div>

                                {/* Price Tag */}
                                <div className="flex items-baseline mb-6">
                                    <span className="text-3xl font-bold">${subscriptionAmount}</span>
                                    <span className="text-base-content/70 ml-1">/month</span>
                                </div>

                                {/* Features */}
                                <div className="divider"></div>
                                <ul className="space-y-3 mb-6">
                                    {features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <CheckCircle2 className="text-primary" size={18} />
                                            <span className="text-base-content/80">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="divider"></div>

                                {/* Payment Form */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Card Information</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="1234 1234 1234 1234"
                                                className="input input-bordered w-full pl-10"
                                            />
                                            <CreditCard className="absolute left-3 top-3 text-base-content/50" size={20} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Expiry Date</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="input input-bordered"
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">CVC</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                className="input input-bordered"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                                        disabled={loading}
                                    >
                                        {loading ? 'Processing...' : `Subscribe Now`}
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="card-body items-center text-center py-12">
                            <div className="w-16 h-16 mb-4">
                                <CheckCircle2 className="w-full h-full text-success" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
                            <p className="text-base-content/70 mb-6">Your premium membership is now active.</p>
                            <button
                                onClick={() => window.location.href = '/dashboard/profile'}
                                className="btn btn-primary"
                            >
                                Return to Profile
                            </button>
                        </div>
                    )}
                </div>

                {/* Security Badge */}
                <div className="text-center mt-6">
                    <div className="flex items-center justify-center gap-2 text-sm text-base-content/70">
                        <Lock size={14} />
                        <span>Secure payment powered by Stripe</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;