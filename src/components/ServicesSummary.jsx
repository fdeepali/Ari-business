import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Zap, FileText, TrendingUp, Truck, DollarSign, BookOpen,
  Sparkles, Globe, Shield, BarChart3, Users, Package, Award,
  AlertCircle, Code, Palette
} from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const iconMap = {
  Zap, FileText, TrendingUp, Truck, DollarSign, BookOpen, Globe, Shield,
  BarChart3, Users, Package, Award, AlertCircle, Code, Palette,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { y: -8, scale: 1.03, transition: { duration: 0.3 } }
};

const fallbackServices = [
  { _id: 'f1', title: 'Complete Amazon Ecosystem', description: 'Every service you need under one roof - from launch to scale', icon: 'Globe' },
  { _id: 'f2', title: 'Expert Team',               description: 'Specialized professionals in every aspect of e-commerce',     icon: 'Shield' },
  { _id: 'f3', title: 'Proven Results',            description: '₹50Cr+ sales managed across 75+ brands',                     icon: 'BarChart3' },
];

const ServicesSummary = () => {
  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/content/services`)
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data.length > 0) setServices(data.data);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="services" className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-semibold text-sm mb-6"
            variants={itemVariants}
          >
            <Sparkles size={16} />
            Complete E-commerce Solutions
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent leading-tight"
            variants={itemVariants}
          >
            Everything You Need to
            <br />
            <span className="bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
              Dominate Amazon
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8"
            variants={itemVariants}
          >
            From building your digital brand to managing complex international operations,
            ARI Business Network provides comprehensive services that turn Amazon sellers into market leaders.
          </motion.p>

          <motion.div className="flex flex-wrap justify-center gap-4" variants={itemVariants}>
            <motion.button
              onClick={() => window.location.href = '/services'}
              className="bg-gradient-to-r hover:cursor-pointer from-black to-gray-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-gray-800 hover:to-black transition-all inline-flex items-center gap-2 shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Services <ArrowRight size={20} />
            </motion.button>
            <motion.button
              onClick={() => window.location.href = '#contact'}
              className="border-2 border-black text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-black hover:text-white transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Free Consultation
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Services Grid — fetched from backend */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {services.map((item, index) => {
            const IconComp = iconMap[item.icon] || Zap;
            return (
              <motion.div
                key={item._id || index}
                className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-black transition-all group"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-black to-gray-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <IconComp className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-black transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesSummary;
