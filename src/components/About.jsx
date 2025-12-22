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

        {/* ================= PARTNERS SECTION ================= */}
        <motion.div
          className="text-center mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Our Strategic Partners
          </motion.h3>

          <motion.p
            className="text-gray-500 mb-12 text-lg"
            variants={itemVariants}
          >
            Trusted by leading brands through our network companies and Amazon seller tools
          </motion.p>

          {/* -------- MAIN PARTNER (NO BG) -------- */}
          <motion.div
            className="max-w-md mx-auto mb-16"
            variants={itemVariants}
            whileHover={{ scale: 1.04, y: -6 }}
            whileTap={{ scale: 0.96 }}
          >
            <div className="bg-gradient-to-br from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d]
                            p-8 rounded-2xl shadow-xl
                            flex flex-col items-center text-center">

              <div className="w-28 h-28 flex items-center justify-center mb-4">
                <img
                  src={partner_image}
                  alt="Bombay Ad Cartel"
                  className="object-contain w-full h-full p-2"
                />
              </div>

              <h4 className="font-bold text-2xl text-white mb-2">
                Bombay Ad Cartel
              </h4>

              <p className="text-white/90 mb-6">
                Digital Marketing Experts
              </p>

              <a
                href="https://www.bombayadcartel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 font-semibold px-5 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Visit Website
              </a>
            </div>
          </motion.div>

          {/* -------- SUB PARTNERS GRID -------- */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
          >
            {/* ADISOFT */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <div className="bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-6 rounded-2xl shadow-lg border border-gray-700 text-center h-full">
                <div className="w-24 h-24 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <img src={partner2_image} alt="AdiSoft" className="p-2" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">AdiSoft</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Digital Excellence Partner
                </p>
                <a
                  href="https://www.adisoft.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-200"
                >
                  Visit Website
                </a>
              </div>
            </motion.div>

            {/* HELIUM 10 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <div className="bg-gradient-to-br from-[#2d3561] via-[#4a5f8f] to-[#6c7eb8] p-6 rounded-2xl shadow-lg border border-gray-700 text-center h-full">
                <div className="w-24 h-24 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <img src={partner3_image} alt="Helium 10" className="p-2" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Helium 10</h4>
                <p className="text-gray-200 text-sm mb-4">
                  Amazon Keyword Research
                </p>
                <a
                  href="https://i.helium10.com/raPZj3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-200"
                >
                  Sign Up Now
                </a>
              </div>
            </motion.div>

            {/* PAYONEER */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <div className="bg-gradient-to-br from-[#e74c3c] via-[#f39c12] to-[#f1c40f] p-6 rounded-2xl shadow-lg border border-gray-700 text-center h-full">
                <div className="w-24 h-24 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <img src={partner4_image} alt="Payoneer" className="p-2" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Payoneer</h4>
                <p className="text-gray-200 text-sm mb-4">
                  Cross-Border Payments
                </p>
                <a
                  href="https://tracking.payoneer.com/aff_ad?campaign_id=954&aff_id=47992"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-200"
                >
                  Get Started
                </a>
              </div>
            </motion.div>

            {/* HELLOLEADS CRM */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <div className="bg-gradient-to-br from-[#102a43] via-[#243b53] to-[#334e68] p-6 rounded-2xl shadow-lg border border-gray-700 text-center h-full">
                <div className="w-24 h-24 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <img src={partner5_image} alt="HelloLeads CRM" className="p-2" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">HelloLeads CRM</h4>
                <p className="text-gray-200 text-sm mb-4">
                  Lead Management &amp; CRM Tool
                </p>
                <a
                  href="https://app.helloleads.io/index.php/app/account/refernow?referral=SG2TE96086&referrer=Rahul&company=Ari+Business+Network+&userId=129085"
                  target="_blank"
                  className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-200"
                >
                  Claim Offer
                </a>
              </div>
            </motion.div>
          </motion.div>
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
              Book a strategy call or get in touch directly — let's
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
