import React from 'react';
import { motion } from 'framer-motion';
import about from '../assets/about.jpg';
import profile_image from '../assets/pfp_rahul.jpeg';
import {
  Award,
  Users,
  TrendingUp,
  Shield,
  Instagram,
  Linkedin,
  Mail,
  CalendarCheck
} from 'lucide-react';

import partner_image from '../assets/partner_image.webp';
import partner2_image from '../assets/adi_logo.png';
import partner3_image from '../assets/helium10_logo.png';
import partner4_image from '../assets/payoneer_logo.png';
import partner5_image from '../assets/HelloLeadsCRM.png';

import { Link, useNavigate, useLocation } from 'react-router-dom';

/* ---------------- ANIMATION VARIANTS ---------------- */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' }
  },
  hover: {
    y: -10,
    boxShadow: '0 25px 50px rgba(234, 179, 8, 0.15)',
    transition: { duration: 0.3 }
  }
};

const floatingAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

/* ---------------- COMPONENT ---------------- */

function About() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollOrNavigate = sectionId => {
    const scrollToSection = id => {
      const element = document.getElementById(id);
      if (!element) return;
      const offset = 80;
      const y =
        element.getBoundingClientRect().top +
        window.pageYOffset -
        offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    };

    if (location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 200);
    }
  };

  return (
    <section className="py-5 px-6 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ---------------- HEADER ---------------- */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.span
            className="text-yellow-600 font-semibold text-lg mb-4 block"
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
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Strategic Amazon consulting backed by real-world execution and
            global marketplace expertise.
          </motion.p>
        </motion.div>

        {/* ---------------- IMAGE BANNER ---------------- */}
        <motion.div
          className="mb-16 rounded-3xl overflow-hidden relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageVariants}
        >
          <img
            src={about}
            alt="Amazon Experts"
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        {/* ---------------- FOUNDER SECTION ---------------- */}
        <motion.div
          className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-10 md:p-14 rounded-3xl mb-20 shadow-2xl relative"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <img
              src={profile_image}
              alt="Rahul Vanzara"
              className="w-56 rounded-2xl border-4 border-yellow-500 shadow-xl"
            />

            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-4xl font-bold mb-3">Rahul Vanzara</h3>
              <p className="text-yellow-400 font-semibold mb-4">
                Amazon FBA & Global E-commerce Specialist
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Helping brands scale profitably on Amazon through
                data-driven strategies, compliance, and global expansion.
              </p>

              <div className="flex gap-4 justify-center lg:justify-start">
                <a
                  href="https://www.instagram.com/ari_business_network/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram />
                </a>
                <a
                  href="https://www.linkedin.com/in/rahulv96"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin />
                </a>
                <a href="mailto:info@aribusinessnetwork.com">
                  <Mail />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ---------------- STATS ---------------- */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { number: '75+', label: 'Brands Transformed', icon: <Users /> },
            { number: '$15M+', label: 'Revenue Generated', icon: <TrendingUp /> },
            { number: '7+', label: 'Years Experience', icon: <Award /> },
            { number: '100%', label: 'Client Satisfaction', icon: <Shield /> }
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-lg text-center"
              variants={itemVariants}
            >
              <div className="mb-3 text-yellow-500 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ---------------- FINAL CTA (UPDATED) ---------------- */}
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-10 md:p-14 rounded-3xl shadow-2xl"
            variants={itemVariants}
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Scale Your Amazon Business?
            </h3>

            <p className="text-gray-300 max-w-3xl mx-auto mb-10 text-lg">
              Book a strategy call or get in touch directly — let’s
              create a profitable Amazon growth roadmap.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-6">
              <motion.button
                onClick={() => handleScrollOrNavigate('contact')}
                className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-yellow-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Rahul
              </motion.button>

              <motion.button
                onClick={() => navigate('/book-appointment')}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CalendarCheck />
                Book Appointment
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

export default About;
