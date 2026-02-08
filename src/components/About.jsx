import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

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

import partner2_image from '../assets/adi_logo.png';
import partner3_image from '../assets/helium10_logo.png';
import partner4_image from '../assets/payoneer_logo.png';
import partner5_image from '../assets/HelloLeadsCRM.png';

/* =====================================================
   GA4 GENERIC OUTBOUND TRACKING
   Event: outbound_click
===================================================== */
const trackOutbound = ({ partner, url }) => {
  if (window.gtag) {
    window.gtag('event', 'outbound_click', {
      partner_name: partner,
      link_url: url,
      link_domain: new URL(url).hostname,
      source_page: window.location.pathname
    });
  }
};

/* ================= ANIMATION VARIANTS ================= */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
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
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

/* ================= COMPONENT ================= */

function About() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollOrNavigate = sectionId => {
    const scrollToSection = id => {
      const el = document.getElementById(id);
      if (!el) return;
      const offset = 80;
      const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
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
    <section className="py-10 px-6 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
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
            className="text-5xl md:text-6xl font-bold mb-6"
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

        {/* ================= IMAGE BANNER ================= */}
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

        {/* ================= FOUNDER ================= */}
<motion.div
  className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-10 md:p-14 rounded-3xl mb-20 shadow-2xl"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={itemVariants}
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

      <p className="text-gray-300 mb-6">
        Helping brands scale profitably on Amazon through
        data-driven strategies, compliance, and global expansion.
      </p>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
        {/* Social Icons */}
        <div className="flex gap-4 justify-center lg:justify-start">
          <a href="https://www.instagram.com/ari_business_network/" target="_blank" rel="noopener noreferrer">
            <Instagram />
          </a>
          <a href="https://www.linkedin.com/in/rahulv96" target="_blank" rel="noopener noreferrer">
            <Linkedin />
          </a>
          <a href="mailto:info@aribusinessnetwork.com">
            <Mail />
          </a>
        </div>

        {/* Golden Button */}
        <a
          href="/about-rahul"
          className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-semibold shadow-lg hover:shadow-yellow-500/40 hover:scale-105 transition-all duration-300"
        >
          View About Rahul
        </a>
      </div>
    </div>
  </div>
</motion.div>


        {/* ================= PARTNERS ================= */}
        <motion.div
          className="text-center mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h3
            className="text-3xl md:text-4xl font-bold mb-12"
            variants={itemVariants}
          >
            Our Strategic Partners
          </motion.h3>

          {/* 🚫 Bombay Ad Cartel intentionally hidden */}
          {false && <div />}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">

            {/* ADISOFT */}
            <div className="bg-[#0f2027] p-6 rounded-2xl text-white text-center">
              
              {/* Image container with white background */}
              <div className="bg-white rounded-xl p-3 h-50 w-[97%] flex items-center justify-center mb-4">
                <img 
                  src={partner2_image} 
                  alt="AdiSoft" 
                  className="mx-auto h-16 object-contain"
                />
              </div>

              <h4 className="font-bold mb-3">AdiSoft</h4>

              <a
                href="https://www.adisoft.in"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-4 py-2 rounded-lg font-semibold inline-block"
                onClick={() =>
                  trackOutbound({ partner: 'adisoft', url: 'https://www.adisoft.in' })
                }
              >
                Visit Website
              </a>

            </div>

            {/* HELIUM 10 */}
            <div className="bg-[#2d3561] p-6 rounded-2xl text-white text-center">
  
              {/* Image container with white background */}
              <div className="bg-white rounded-xl p-3 flex justify-center items-center h-50 mb-4">
                <img 
                  src={partner3_image} 
                  alt="Helium 10" 
                  className="mx-auto h-16 object-contain"
                />
              </div>

              <h4 className="font-bold mb-3">Helium 10</h4>

              <a
                href="https://i.helium10.com/raPZj3"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-4 py-2 rounded-lg font-semibold inline-block"
                onClick={() =>
                  trackOutbound({ partner: 'helium10', url: 'https://i.helium10.com/raPZj3' })
                }
              >
                Sign Up Now
              </a>

            </div>

            {/* PAYONEER */}
            <div className="bg-[#f39c12] p-6 rounded-2xl text-white text-center">
              
              {/* Image container with white background */}
              <div className="bg-white rounded-xl p-3 flex justify-center items-center h-50 mb-4">
                <img 
                  src={partner4_image} 
                  alt="Payoneer" 
                  className="mx-auto h-16 object-contain"
                />
              </div>

              <h4 className="font-bold mb-3">Payoneer</h4>

              <a
                href="https://paynr.co/49QbRtF"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-4 py-2 rounded-lg font-semibold inline-block"
                onClick={() =>
                  trackOutbound({ partner: 'payoneer', url: 'https://paynr.co/49QbRtF' })
                }
              >
                Get Started
              </a>

            </div>

            {/* HELLOLEADS */}
            <div className="bg-[#243b53] p-6 rounded-2xl text-white text-center">
  
              {/* Image container with white background */}
              <div className="bg-white rounded-xl p-3 flex items-center h-50 justify-center mb-4">
                <img 
                  src={partner5_image} 
                  alt="HelloLeads CRM" 
                  className="mx-auto h-16 object-contain"
                />
              </div>

              <h4 className="font-bold mb-3">HelloLeads CRM</h4>

              <a
                href="https://app.helloleads.io"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-4 py-2 rounded-lg font-semibold inline-block"
                onClick={() =>
                  trackOutbound({ partner: 'helloleads', url: 'https://app.helloleads.io' })
                }
              >
                Claim Offer
              </a>

            </div>

          </div>
        </motion.div>

        {/* ================= FINAL CTA ================= */}
        <div className="text-center">
          <button
            onClick={() => handleScrollOrNavigate('contact')}
            className="px-8 py-4 bg-black text-white rounded-xl font-bold hover:bg-yellow-500"
          >
            Contact Rahul
          </button>
        </div>

      </div>
    </section>
  );
}

export default About;
