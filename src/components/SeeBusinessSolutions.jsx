import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, FileText, Shield, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: "easeOut"
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5
        }
    }
};

function SeeBusinessSolutions() {
    return (
        <motion.div
            className="my-16 md:my-24 p-10 md:p-12 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-2xl border border-amber-200 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            {/* Header Section */}
            <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl shadow-lg">
                        <Briefcase size={32} className="text-white" />
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-700 to-yellow-800 bg-clip-text text-transparent">
                        Premium Business Solutions
                    </h2>
                </div>
                <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                    Comprehensive suite of professional services designed to elevate your e-commerce business to new heights
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
                <motion.div 
                    className="bg-white p-6 rounded-2xl shadow-lg border border-amber-100"
                    variants={itemVariants}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <Shield size={20} className="text-amber-700" />
                        </div>
                        <h3 className="font-bold text-gray-900">Regulatory Excellence</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                        Complete GST, FSSAI, ISO certification and compliance management to ensure legal operation
                    </p>
                </motion.div>

                <motion.div 
                    className="bg-white p-6 rounded-2xl shadow-lg border border-amber-100"
                    variants={itemVariants}
                    transition={{ delay: 0.1 }}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <TrendingUp size={20} className="text-amber-700" />
                        </div>
                        <h3 className="font-bold text-gray-900">Growth Strategy</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                        Advanced Amazon account management and sales optimization strategies for maximum revenue
                    </p>
                </motion.div>

                <motion.div 
                    className="bg-white p-6 rounded-2xl shadow-lg border border-amber-100"
                    variants={itemVariants}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <FileText size={20} className="text-amber-700" />
                        </div>
                        <h3 className="font-bold text-gray-900">Legal Protection</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                        Intellectual property protection, trademark registration, and legal documentation services
                    </p>
                </motion.div>

                <motion.div 
                    className="bg-white p-6 rounded-2xl shadow-lg border border-amber-100"
                    variants={itemVariants}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <Users size={20} className="text-amber-700" />
                        </div>
                        <h3 className="font-bold text-gray-900">Business Setup</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                        End-to-end company registration and business entity formation with ongoing support
                    </p>
                </motion.div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl p-6 mb-8 shadow-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold text-white">500+</div>
                        <div className="text-amber-100 text-sm">Clients Served</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">99%</div>
                        <div className="text-amber-100 text-sm">Success Rate</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">24/7</div>
                        <div className="text-amber-100 text-sm">Expert Support</div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
                <p className="text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto">
                    From initial setup to global expansion, our premium business solutions provide the foundation for sustainable growth and market dominance in the competitive e-commerce landscape.
                </p>
                
                <Link to="/business-solutions">
                    <motion.button
                        className="bg-gradient-to-r from-amber-600 to-yellow-700 text-white px-10 py-4 rounded-2xl font-bold hover:from-amber-700 hover:to-yellow-800 transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-2xl shadow-amber-500/25"
                        whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 20px 40px rgba(245, 158, 11, 0.3)"
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Explore Premium Solutions
                        <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </Link>
                
                <p className="text-amber-700 text-sm mt-4 font-medium">
                    Schedule a free consultation with our experts
                </p>
            </div>
        </motion.div>
    );
}

export default SeeBusinessSolutions;