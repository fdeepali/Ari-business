import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import services from '../assets/services.png';
import { Check, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.98
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const floatingAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

function Services() {
  const [expandedService, setExpandedService] = useState(null);

  const serviceList = [
    { 
      title: "Amazon Onboarding", 
      description: "Streamlined onboarding process to get your products live on Amazon efficiently.",
      features: ["Account setup", "Product listing", "Brand registry", "Payment configuration"]
    },
    { 
      title: "Imaging", 
      description: "Professional imaging services to showcase your products in the best light.",
      features: ["Professional photography", "Lifestyle shots", "Infographic creation", "A+ content imagery"]
    },
    { 
      title: "Cataloging", 
      description: "Comprehensive catalog management for organized and appealing product listings.",
      features: ["Product categorization", "SEO optimization", "Bullet point optimization", "Keyword research"]
    },
    { 
      title: "Account Management", 
      description: "Expert account management to navigate Amazon's Seller Central effectively.",
      features: ["Daily monitoring", "Performance metrics", "Policy compliance", "Growth strategy"]
    },
    { 
      title: "Training", 
      description: "Tailored training sessions to empower sellers with Amazon marketplace insights.",
      features: ["One-on-one sessions", "Video tutorials", "Best practices", "Market trends"]
    },
    { 
      title: "Seller Reinstatement", 
      description: "Specialized support for reinstating suspended Amazon seller accounts.",
      features: ["Appeal writing", "Document preparation", "Communication with Amazon", "Preventive measures"]
    },
    { 
      title: "Accounting", 
      description: "Hassle-free accounting services to keep your financials in order.",
      features: ["Profit tracking", "Expense management", "Tax preparation", "Financial reporting"]
    },
    { 
      title: "Enhanced Brand Content", 
      description: "Engaging content creation to enhance your brand presence on Amazon.",
      features: ["A+ Content design", "Brand story", "Comparison charts", "Enhanced images"]
    },
    { 
      title: "Taxes", 
      description: "Expert guidance on tax-related matters for Amazon sellers.",
      features: ["Sales tax compliance", "International taxes", "Tax filing", "Deduction optimization"]
    },
    { 
      title: "IP Accelerator", 
      description: "Accelerate your brand's intellectual property protection on Amazon.",
      features: ["Trademark filing", "Brand registry", "IP protection", "Legal support"]
    },
    { 
      title: "Excess Inventory", 
      description: "Strategic solutions for managing excess inventory effectively.",
      features: ["Liquidation strategies", "Promotional campaigns", "Outlet deals", "Inventory analysis"]
    },
    { 
      title: "Compliance", 
      description: "Ensure compliance with Amazon's policies and regulations.",
      features: ["Policy monitoring", "Documentation", "Quality control", "Risk assessment"]
    },
    { 
      title: "FBA Preparation", 
      description: "Efficient preparation of products for Fulfillment by Amazon (FBA).",
      features: ["Labeling services", "Packaging guidelines", "Shipment creation", "Inventory prep"]
    },
    { 
      title: "International Shipping & Returns", 
      description: "Seamless management of international shipping and returns.",
      features: ["Global logistics", "Customs clearance", "Return processing", "Customer support"]
    },
    { 
      title: "Storage", 
      description: "Secure and organized storage solutions for your inventory.",
      features: ["Warehouse management", "Inventory tracking", "Security systems", "Climate control"]
    },
    { 
      title: "Translation", 
      description: "Expert translation services for expanding your reach to diverse markets.",
      features: ["Multi-language support", "Cultural adaptation", "Local SEO", "Market-specific content"]
    },
  ];

  const toggleService = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

  return (
    <section id="services" className="py-20 px-6 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Ari Business Network: Your Partner in Amazon Success
          </motion.h1>
          <motion.h2 
            className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2"
            variants={itemVariants}
          >
            Services Overview
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600"
            variants={itemVariants}
          >
            Simple. Focused. Results that scale your store.
          </motion.p>
        </motion.div>

        {/* Optional Banner Image */}
        <motion.div 
          className="mb-12 rounded-2xl overflow-hidden relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageVariants}
        >
          <img
            src={services}
            alt="Our Services"
            className="w-full h-64 md:h-96 object-cover"
            style={{ filter: 'grayscale(100%)' }}
          />
          {/* Animated overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          
          {/* Floating elements */}
          <motion.div 
            className="absolute top-6 left-6 w-8 h-8 bg-white/20 rounded-full"
            animate={floatingAnimation}
          />
          <motion.div 
            className="absolute bottom-6 right-6 w-6 h-6 bg-white/20 rounded-full"
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay: 1 }
            }}
          />
        </motion.div>

        {/* Services List */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {serviceList.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover="hover"
              whileTap="tap"
              className="bg-white p-6 border-2 border-black rounded-xl cursor-pointer group relative overflow-hidden"
              onClick={() => toggleService(index)}
            >
              {/* Background accent */}
              <motion.div 
                className="absolute top-0 right-0 w-20 h-20 bg-black/5 rounded-full -translate-y-10 translate-x-10"
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Service number with animation */}
              <motion.div 
                className="absolute top-4 left-4 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {index + 1}
              </motion.div>

              <div className="ml-12">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl md:text-2xl font-bold pr-8 group-hover:text-gray-700 transition-colors">
                    {service.title}
                  </h3>
                  <motion.div
                    animate={{ rotate: expandedService === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {expandedService === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </motion.div>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {service.description}
                </p>

                <AnimatePresence>
                  {expandedService === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <Check size={16} className="text-green-600" />
                          Key Features:
                        </h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, featureIndex) => (
                            <motion.li
                              key={featureIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: featureIndex * 0.1 }}
                              className="flex items-center gap-2 text-gray-600"
                            >
                              <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hover arrow indicator */}
                <motion.div
                  className="flex items-center gap-2 text-black mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <span className="text-sm font-medium">
                    {expandedService === index ? "Show less" : "Learn more"}
                  </span>
                  <ArrowRight size={16} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16 p-8 bg-black text-white rounded-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Ready to Transform Your Amazon Business?
          </motion.h3>
          <motion.p 
            className="text-gray-300 mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Let's discuss how our comprehensive services can drive your success on Amazon.
          </motion.p>
          <motion.button
            className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default Services;