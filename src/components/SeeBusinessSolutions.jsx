import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, FileText } from 'lucide-react';
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

function SeeBusinessSolutions() {
    return (
        <motion.div
            className="p-10 md:p-12 bg-white rounded-3xl shadow-xl border border-gray-100 max-w-lg mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="flex items-center gap-3 mb-4">
                <Briefcase size={32} className="text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">
                    Full Service Catalog
                </h2>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
                Explore our detailed business solutions spanning Amazon Account Management, **Regulatory Compliance (GST, FSSAI, ISO)**, Business Setup, Legal IP protection, and specialized Financial Services. Everything you need to scale your e-commerce brand effectively.
            </p>
            
            <Link to="/business-solutions">
                <motion.button
                    className="w-full bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 inline-flex items-center justify-center gap-2 shadow-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    View All Business Solutions
                    <ArrowRight size={20} />
                </motion.button>
            </Link>
        </motion.div>
    );
}

export default SeeBusinessSolutions;