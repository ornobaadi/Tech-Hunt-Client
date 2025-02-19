import { useState } from "react";

// Individual FAQ item component
const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-base-300 py-4">
            <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-semibold">{question}</h3>
                <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>
            <div className={`mt-2 text-base-content/80 overflow-hidden transition-all ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="py-2">{answer}</p>
            </div>
        </div>
    );
};

// Main FAQ section component that uses the FaqItem component
const FAQ = () => {
    // FAQ data array - you can move this to props if you want to pass it from parent
    const faqData = [
        {
            question: "How is Tech Hunt different from Product Hunt?",
            answer: "While inspired by Product Hunt, Tech Hunt focuses specifically on technology products like web apps, AI tools, software, and mobile applications. We've implemented a role-based system that ensures quality through community moderation, and offer unique features like membership tiers for product creators."
        },
        {
            question: "Can I submit my product for free?",
            answer: "Yes! Basic users can submit one product for review. However, we offer premium memberships that allow for unlimited submissions and additional promotional features to help your product stand out."
        },
        {
            question: "How does the moderation process work?",
            answer: "Submitted products go through a review by our moderator team who check for quality, relevance, and adherence to our community guidelines. This ensures that users discover genuinely valuable tools rather than promotional content."
        },
        {
            question: "How can I become a moderator?",
            answer: "Active community members who consistently contribute quality reviews and help report inappropriate content may be invited to become moderators. Alternatively, you can apply for a moderator position through your profile settings."
        },
        {
            question: "Do you offer discounts for startups or indie developers?",
            answer: "Yes! We have special coupon codes for indie developers and early-stage startups. These coupons provide discounts on our premium membership tiers to help new creators gain visibility."
        }
    ];

    return (
        <section className="py-10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                <h4 className="btn pointer-events-none text-purple-500 uppercase text-sm font-bold my-5">FAQ</h4>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-base-content/70 max-w-2xl mx-auto">
                        Everything you need to know about Tech Hunt and how to get started.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    {faqData.map((faq, index) => (
                        <FaqItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;