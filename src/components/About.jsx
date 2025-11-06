import React from 'react';
import { motion } from 'framer-motion';
import about from '../assets/about.jpg';
import profile_image from '../assets/pfp_rahul.jpeg';
import { Target, Rocket, TrendingUp, Check, Menu, X, Phone, Mail, MapPin, Linkedin, Youtube, ArrowRight, Package, BarChart3, FileText, Calculator, Instagram, ChevronLeft, ChevronRight, Award, Users, Globe, Shield } from 'lucide-react';

import partner_image from '../assets/partner_image.webp'
import partner2_image from '../assets/adi_logo.png'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  },
  hover: {
    y: -10,
    boxShadow: "0 25px 50px rgba(234, 179, 8, 0.15)",
    transition: {
      duration: 0.3,
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

function About() {
  return (
    <section className="py-5 px-6 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.span 
            className="text-yellow-600 font-semibold text-lg tracking-wide mb-4 block"
            variants={itemVariants}
          >
            MEET THE EXPERTS
          </motion.span>
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Your Amazon Growth Partners
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            We're not just consultants—we're your strategic partners in dominating the Amazon marketplace. 
            With proven expertise in FBA optimization, global expansion, and brand protection.
          </motion.p>
        </motion.div>

        {/* About Image Banner */}
        <motion.div 
          className="mb-16 rounded-3xl overflow-hidden relative group"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageVariants}
        >
          <img 
            src={about} 
            alt="Amazon FBA Experts Team" 
            className="w-full h-64 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Enhanced overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          {/* Floating text overlay */}
          <motion.div 
            className="absolute bottom-8 left-8 text-white"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Proven Amazon Excellence</h3>
            <p className="text-gray-200">Transforming brands into marketplace leaders</p>
          </motion.div>
        </motion.div>
        
        {/* Founder Spotlight - Enhanced */}
        <motion.div 
          className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-8 md:p-12 mb-16 rounded-3xl relative overflow-hidden shadow-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
          whileHover="hover"
        >
          {/* Enhanced background decorative elements */}
          <motion.div 
            className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/10 rounded-full -translate-y-20 translate-x-20"
            animate={floatingAnimation}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500/10 rounded-full translate-y-16 -translate-x-16"
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay: 1.5 }
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 w-24 h-24 bg-yellow-500/5 rounded-full"
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay: 0.7 }
            }}
          />
          
          <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative">
                <img 
                  src={profile_image} 
                  alt="Rahul Vanzara - Amazon FBA Expert" 
                  className="w-48 md:w-56 aspect-square rounded-2xl object-cover border-4 border-yellow-500 shadow-2xl"
                />
                {/* Verified badge */}
                <motion.div 
                  className="absolute -bottom-3 -right-3 bg-yellow-500 text-black p-2 rounded-full shadow-lg"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, type: "spring" }}
                >
                  <Award size={20} />
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="text-center lg:text-left flex-1"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span 
                className="text-yellow-400 font-semibold text-sm tracking-wide mb-2 block"
                variants={itemVariants}
              >
                FOUNDER & STRATEGY LEAD
              </motion.span>
              <motion.h3 
                className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent"
                variants={itemVariants}
              >
                Rahul Vanzara
              </motion.h3>
              <motion.p 
                className="text-xl text-yellow-400 mb-6 font-semibold"
                variants={itemVariants}
              >
                Amazon FBA & Global E-commerce Specialist
              </motion.p>
              <motion.p 
                className="text-gray-300 leading-relaxed text-lg mb-8"
                variants={itemVariants}
              >
                With extensive expertise in Amazon FBA optimization, international marketplace expansion, 
                brand protection, and tax compliance. I've helped numerous brands scale from startups to 
                market leaders through strategic Amazon consulting and data-driven growth strategies.
              </motion.p>

              {/* Expertise Tags */}
              <motion.div 
                className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start"
                variants={containerVariants}
              >
                {['FBA Optimization', 'Global Expansion', 'Brand Protection', 'PPC Strategy', 'Tax Compliance', 'IP Protection'].map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-300 text-sm font-medium"
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(234, 179, 8, 0.3)"
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="flex gap-4 justify-center lg:justify-start"
                variants={itemVariants}
              >
                <motion.a 
                  href="https://www.instagram.com/ari_business_network/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 bg-white/10 rounded-xl hover:bg-yellow-500 hover:text-black transition-all duration-300 border border-white/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram size={24} />
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/rahulv96?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 bg-white/10 rounded-xl hover:bg-yellow-500 hover:text-black transition-all duration-300 border border-white/20"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin size={24} />
                </motion.a>
                <motion.a 
                  href="mailto:info@aribusinessnetwork.com" 
                  className="p-3 bg-white/10 rounded-xl hover:bg-yellow-500 hover:text-black transition-all duration-300 border border-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail size={24} />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Company Credentials */}
<motion.div 
  className="mb-20 text-center"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={containerVariants}
>
  <motion.p 
    className="text-gray-500 mb-12 text-lg"
    variants={itemVariants}
  >
    Trusted by leading brands through our network companies
  </motion.p>

  <motion.div 
    className="flex flex-col md:flex-row justify-center gap-8 items-center"
    variants={containerVariants}
  >
    {/* ADISOFT.IN */}
    <motion.div 
      className="group cursor-pointer w-full md:w-[350px]"
      variants={itemVariants}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 flex flex-col items-center text-center">
        <div className="w-28 h-28 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
          <img 
            src={partner2_image} 
            alt="ADI Soft" 
            className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105" 
          />
        </div>
        <h4 className="font-bold text-2xl text-white mb-2">adisoft.in</h4>
        <p className="text-gray-300 mb-6">Trusted Partner in Digital Excellence</p>

        <a 
          href="https://www.adisoft.in" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-white text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300"
        >
          Visit Website
        </a>
      </div>
    </motion.div>

    {/* Bombay Ad Cartel */}
    <motion.div 
      className="group cursor-pointer w-full md:w-[350px]"
      variants={itemVariants}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="bg-gradient-to-br from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 flex flex-col items-center text-center">
        <div className="w-28 h-28 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
          <img 
            src={partner_image} 
            alt="Bombay Ad Cartel" 
            className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105" 
          />
        </div>
        <h4 className="font-bold text-2xl text-white mb-2">Bombay Ad Cartel</h4>
        <p className="text-gray-200 mb-6">Digital Marketing Experts</p>

        <a 
          href="https://www.bombayadcartel.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-white text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300"
        >
          Visit Website
        </a>
      </div>
    </motion.div>
  </motion.div>
</motion.div>


        {/* Enhanced Stats Section */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {[
            { number: "75+", label: "Brands Transformed", icon: <Users className="text-yellow-500" size={24} /> },
            { number: "$15M+", label: "Revenue Generated", icon: <TrendingUp className="text-yellow-500" size={24} /> },
            { number: "7+", label: "Years Experience", icon: <Award className="text-yellow-500" size={24} /> },
            { number: "100%", label: "Client Satisfaction", icon: <Shield className="text-yellow-500" size={24} /> }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 group cursor-pointer"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                y: -8,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-yellow-50 rounded-xl group-hover:bg-yellow-100 transition-colors duration-300">
                  {stat.icon}
                </div>
              </div>
              <motion.div 
                className="text-3xl lg:text-4xl font-bold text-black mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div 
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black p-8 rounded-3xl shadow-2xl"
            variants={itemVariants}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Scale Your Amazon Business?</h3>
            <p className="text-gray-800 mb-6 text-lg">Let's discuss your brand's potential with a free strategy session</p>
            <motion.button 
              className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Free Consultation
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;