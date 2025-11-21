import React from 'react';
import { motion } from 'framer-motion';
import { Smile, TrendingUp, ShieldCheck } from 'lucide-react';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 15
        }
    }
};

// Testimonial Data
const testimonialsData = [
    {
        quote: "Rahul's expertise and guidance were invaluable in helping us successfully launch our brand on Amazon. His personalized approach and attention to detail made all the difference.",
        author: "Julie, Founder",
        company: "Eco-Friendly Home Goods",
        icon: Smile,
        color: "text-blue-600",
        border: "border-blue-500",
    },
    {
        quote: "Rahul's deep understanding of the e-commerce landscape and his ability to navigate the complexities of Amazon were instrumental in driving our global expansion.",
        author: "John, CEO",
        company: "International Clothing Brand",
        icon: TrendingUp,
        color: "text-green-600",
        border: "border-green-500",
    },
    {
        quote: "Working with Rahul has been a game-changer for our business. His expertise in sales, marketing, and digital transformation has helped us unlock new opportunities on Amazon.",
        author: "Sarah, Director of Operations",
        company: "Consumer Electronics Startup",
        icon: ShieldCheck,
        color: "text-purple-600",
        border: "border-purple-500",
    },
];

function Testimonials() {
    return (
        <section className="py-16 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header and Satisfaction Gauge Area */}
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-center mb-16 text-center md:text-left"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={containerVariants}
                >
                    <motion.h1 
                        className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight"
                        variants={itemVariants}
                    >
                        Testimonials: Satisfied Clients
                    </motion.h1>
                    <motion.div variants={itemVariants} className="mt-8 md:mt-0 flex flex-col items-center">
                        {/* Placeholder for the Customer Satisfaction image */}
                        <div className="w-32 h-32">
                                                   </div>
                        <p className="text-sm text-gray-500 mt-2 font-medium">High Customer Satisfaction</p>
                    </motion.div>
                </motion.div>

                {/* Testimonial Cards Grid */}
                <motion.div
                    className="grid gap-10 md:grid-cols-3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                >
                    {testimonialsData.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col h-full bg-white p-6 border-l-4 shadow-lg rounded-lg transition-shadow duration-300 hover:shadow-2xl"
                            variants={itemVariants}
                            style={{ borderColor: testimonial.border }} // Apply border color dynamically
                        >
                            <div className="flex-grow">
                                <testimonial.icon size={30} className={`mb-4 ${testimonial.color}`} />
                                <p className="text-lg text-gray-700 mb-6 italic leading-relaxed">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>
                            </div>
                            
                            {/* Author details */}
                            <div className="pt-4 border-t border-gray-100">
                                <p className="font-semibold text-gray-800">
                                    - {testimonial.author}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {testimonial.company}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default Testimonials;