import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, TrendingUp, Users, BookOpen, Headphones, GraduationCap, Clock, CheckCircle, ArrowRight, Zap, Target, Globe, MessageSquare } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  },
  hover: {
    y: -10,
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    transition: { duration: 0.3 }
  }
};

function WhyChooseUs() {
  const [activeSupport, setActiveSupport] = useState(0);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const supportServices = [
    {
      icon: GraduationCap,
      title: "Seller Training",
      subtitle: "Master Amazon's Complex Ecosystem",
      description: "Equip your team with comprehensive skills to navigate and succeed on Amazon's platform.",
      features: [
        "One-on-one personalized training sessions",
        "Video tutorial library with step-by-step guides",
        "Best practices documentation and templates",
        "Real-time market trend insights and updates",
        "Category-specific selling strategies",
        "Competitive analysis techniques"
      ],
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: Headphones,
      title: "Ongoing Guidance",
      subtitle: "Stay Ahead of Industry Changes",
      description: "Benefit from continuous expert advice that keeps you informed and competitive.",
      features: [
        "Weekly industry update briefings",
        "Policy change alerts and implications",
        "Quarterly business review sessions",
        "Strategic growth planning consultations",
        "Algorithm update guidance",
        "Emerging trends and opportunities analysis"
      ],
      color: "from-purple-500 to-purple-700"
    },
    {
      icon: MessageSquare,
      title: "Dedicated Support",
      subtitle: "Personalized Attention When You Need It",
      description: "Enjoy timely responses, dedicated account management, and priority assistance.",
      features: [
        "Priority email and chat support",
        "Dedicated account manager assignment",
        "24-48 hour response guarantee",
        "Emergency issue escalation protocols",
        "Monthly strategy consultation calls",
        "Direct access to specialized experts"
      ],
      color: "from-green-500 to-green-700"
    }
  ];

  const whyChooseReasons = [
    {
      icon: Zap,
      title: "Full-Stack Amazon Expertise",
      description: "We handle everything Amazon—onboarding, operations, compliance, and growth strategies—all under one roof.",
      stats: "16+ Services",
      details: [
        "Complete catalog management",
        "Account health monitoring",
        "Advanced PPC optimization",
        "International expansion support"
      ]
    },
    {
      icon: Shield,
      title: "We Speak Amazon Fluently",
      description: "Amazon policies evolve constantly. Our team stays ahead of updates so your business never misses a beat or faces unexpected suspensions.",
      stats: "99% Uptime",
      details: [
        "Daily policy monitoring",
        "Proactive compliance management",
        "Risk assessment and mitigation",
        "Legal team for reinstatements"
      ]
    },
    {
      icon: Award,
      title: "Proven Track Record",
      description: "We've helped countless sellers navigate Amazon—from launching new brands to reinstating suspended accounts—across every category and challenge.",
      stats: "50+ Brands",
      details: [
        "Successful account launches",
        "Account reinstatements",
        "Revenue growth optimization",
        "Multi-marketplace expansion"
      ]
    }
  ];

  const uniqueAdvantages = [
    {
      icon: Target,
      title: "Strategic Optimization",
      description: "We maximize every word space and image slot Amazon provides, enhancing your algorithms and reducing ad costs.",
      highlight: "30-40% reduction in advertising costs"
    },
    {
      icon: Globe,
      title: "Global Expertise",
      description: "Regional experts review your content and strategy, ensuring cultural relevance and compliance across international markets.",
      highlight: "Multi-market success guaranteed"
    },
    {
      icon: TrendingUp,
      title: "Data-Driven Results",
      description: "Our approach combines advanced analytics with hands-on experience to deliver measurable growth and profitability.",
      highlight: "$10M+ revenue generated for clients"
    }
  ];

  return (
    <>
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Main Header */}
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Why Work With Us?
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Complete Amazon Expertise Under One Roof. Stop juggling multiple vendors and consultants. 
              <span className="font-semibold text-black"> ARI Business Network</span> provides every service you need to succeed on Amazon—from onboarding to daily operations, compliance, and growth strategies.
            </motion.p>
          </motion.div>

          {/* Core Reasons Grid */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {whyChooseReasons.map((reason, index) => {
              const IconComponent = reason.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white p-8 border-2 border-black rounded-2xl group cursor-pointer relative overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="flex items-center justify-between mb-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-16 h-16 bg-black group-hover:bg-white rounded-xl flex items-center justify-center transition-colors">
                        <IconComponent className="text-white group-hover:text-black transition-colors" size={32} />
                      </div>
                      <div className="bg-gray-100 group-hover:bg-white/20 px-4 py-2 rounded-full">
                        <span className="font-bold text-black group-hover:text-white transition-colors">{reason.stats}</span>
                      </div>
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-200 mb-6 leading-relaxed transition-colors">
                      {reason.description}
                    </p>

                    <div className="space-y-2">
                      {reason.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-black group-hover:text-white transition-colors flex-shrink-0" />
                          <span className="text-sm text-gray-700 group-hover:text-gray-200 transition-colors">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Unique Advantages Section */}
          <motion.div
            className="mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h3 
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              variants={itemVariants}
            >
              What Sets Us Apart
            </motion.h3>
            <div className="grid md:grid-cols-3 gap-6">
              {uniqueAdvantages.map((advantage, index) => {
                const IconComponent = advantage.icon;
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover="hover"
                    className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200"
                  >
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="text-white" size={24} />
                    </div>
                    <h4 className="text-xl font-bold mb-3">{advantage.title}</h4>
                    <p className="text-gray-600 mb-4">{advantage.description}</p>
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
                      <p className="text-sm font-semibold text-gray-800">{advantage.highlight}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Training & Support Section */}
          <motion.div
            className="bg-gradient-to-br from-black to-gray-900 text-white rounded-3xl p-8 md:p-12 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Training & Support Excellence
              </h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Comprehensive training programs and dedicated support to ensure your team masters Amazon and your business thrives
              </p>
            </motion.div>

            {/* Support Service Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {supportServices.map((service, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveSupport(index)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    activeSupport === index
                      ? 'bg-white text-black shadow-lg'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={itemVariants}
                >
                  {service.title}
                </motion.button>
              ))}
            </div>

            {/* Active Support Service Details */}
            <motion.div
              key={activeSupport}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className={`w-20 h-20 bg-gradient-to-br ${supportServices[activeSupport].color} rounded-2xl flex items-center justify-center mb-4`}>
                    {React.createElement(supportServices[activeSupport].icon, { size: 40, className: "text-white" })}
                  </div>
                  <h4 className="text-2xl font-bold mb-2">{supportServices[activeSupport].title}</h4>
                  <p className="text-lg text-gray-300 mb-4">{supportServices[activeSupport].subtitle}</p>
                  <p className="text-gray-400 leading-relaxed">{supportServices[activeSupport].description}</p>
                </div>
                <div className="md:w-2/3">
                  <h5 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle size={24} className="text-green-400" />
                    What's Included:
                  </h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    {supportServices[activeSupport].features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3 bg-white/5 p-4 rounded-xl"
                      >
                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-200">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.button 
              onClick={() => scrollToSection('case-studies')}
              className="inline-flex items-center gap-2 text-lg font-semibold hover:gap-4 transition-all group"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See how we helped others
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default WhyChooseUs;