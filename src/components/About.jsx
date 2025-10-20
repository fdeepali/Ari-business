import React from 'react';
import { motion } from 'framer-motion';
import about from '../assets/about.jpg';
import profile_image from '../assets/pfp_rahul.jpeg';
import { Target, Rocket, TrendingUp, Check, Menu, X, Phone, Mail, MapPin, Linkedin, Youtube, ArrowRight, Package, BarChart3, FileText, Calculator, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';

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
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

function About() {
  return (
    <section id="about" className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            Who We Are
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            We're a team of eCommerce professionals obsessed with scaling Amazon brands through strategic consulting and FBA expertise.
          </motion.p>
        </motion.div>

        {/* About Image Banner */}
        <motion.div 
          className="mb-12 rounded-2xl overflow-hidden relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageVariants}
        >
          <img 
            src={about} 
            alt="Our Team" 
            className="w-full h-64 md:h-96 object-cover"
            style={{ filter: 'grayscale(100%)' }}
          />
          {/* Animated overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>
        
        {/* Founder Spotlight */}
        <motion.div 
          className="bg-gradient-to-br from-black to-gray-900 text-white p-8 md:p-12 mb-12 rounded-2xl relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
          whileHover="hover"
        >
          {/* Background decorative elements */}
          <motion.div 
            className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"
            animate={floatingAnimation}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay: 1 }
            }}
          />
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
  src={profile_image} 
  alt="Rahul Vanzara" 
  className="w-40 md:w-48 aspect-square rounded-full object-cover border-4 border-white shadow-2xl"
/>

            </motion.div>
            <motion.div 
              className="text-center md:text-left"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h3 
                className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                variants={itemVariants}
              >
                Rahul Vanzara
              </motion.h3>
              <motion.p 
                className="text-xl text-gray-300 mb-4"
                variants={itemVariants}
              >
                Founder, Ari Business Network
              </motion.p>
              <motion.p 
                className="text-gray-300 leading-relaxed mb-6"
                variants={itemVariants}
              >
                Leading expert in Amazon FBA and global e-commerce expansion. Specializing in brand growth strategies, cross-border selling, IP protection, and tax compliance. Actively shares insights on Amazon selling strategies through Ari Business Network and social media platforms.
              </motion.p>
              <motion.div 
                className="flex gap-4 justify-center md:justify-start"
                variants={itemVariants}
              >
                <motion.a 
                  href="https://www.instagram.com/ari_business_network/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gray-400 transition p-2 bg-white/10 rounded-full hover:bg-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram size={24} />
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/rahulv96?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gray-400 transition p-2 bg-white/10 rounded-full hover:bg-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin size={24} />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Credentials */}
        <motion.div 
          className="mt-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.p 
            className="text-gray-600 mb-8"
            variants={itemVariants}
          >
            In collaboration with
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-6 items-center"
            variants={containerVariants}
          >
            <motion.div 
              className="px-8 py-4 border-2 border-black rounded-xl bg-white hover:bg-black hover:text-white transition-colors cursor-pointer"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-bold text-lg">Ari Business Network</span>
            </motion.div>
            <motion.div 
              className="px-8 py-4 border-2 border-black rounded-xl bg-white hover:bg-black hover:text-white transition-colors cursor-pointer"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-bold text-lg">Bombay Ad Cartel</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats Section - Additional Visual Element */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {[
            { number: "50+", label: "Brands Helped" },
            { number: "$10M+", label: "Revenue Generated" },
            { number: "5+", label: "Years Experience" },
            { number: "99%", label: "Success Rate" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <motion.div 
                className="text-2xl md:text-3xl font-bold text-black mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default About;