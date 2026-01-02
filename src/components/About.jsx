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

import partner2_image from '../assets/adi_logo.png';
import partner3_image from '../assets/helium10_logo.png';
import partner4_image from '../assets/payoneer_logo.png';
import partner5_image from '../assets/HelloLeadsCRM.png';

import { useNavigate, useLocation } from 'react-router-dom';

/* =====================================================
   GENERIC OUTBOUND TRACKING (GA4 BEST PRACTICE)
   Event name : outbound_click
   Params     : partner_name, link_url, link_domain, source_page
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
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
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

/* ================= COMPONENT ================= */

function About() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollOrNavigate = sectionId => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const offset = 80;
    const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <section className="py-5 px-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="text-5xl font-bold mb-6" variants={itemVariants}>
            Your Amazon Growth Partners
          </motion.h2>
        </motion.div>

        {/* ================= IMAGE ================= */}
        <motion.div
          className="mb-16 rounded-3xl overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageVariants}
        >
          <img src={about} alt="Amazon Experts" className="w-full h-72 object-cover" />
        </motion.div>

        {/* ================= PARTNERS ================= */}
        <motion.div
          className="text-center mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <h3 className="text-3xl font-bold mb-12">Our Strategic Partners</h3>

          {/* 🚫 Bombay Ad Cartel intentionally hidden */}
          {false && <div />}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* ADISOFT */}
            <div className="bg-[#0f2027] p-6 rounded-2xl text-white text-center">
              <img src={partner2_image} alt="AdiSoft" className="mx-auto mb-4" />
              <h4 className="font-bold mb-2">AdiSoft</h4>
              <button
                className="bg-white text-black px-4 py-2 rounded-lg font-semibold"
                onClick={() =>
                  trackOutbound({
                    partner: 'adisoft',
                    url: 'https://www.adisoft.in'
                  })
                }
              >
                Visit Website
              </button>
            </div>

            {/* HELIUM 10 */}
            <div className="bg-[#2d3561] p-6 rounded-2xl text-white text-center">
              <img src={partner3_image} alt="Helium 10" className="mx-auto mb-4" />
              <h4 className="font-bold mb-2">Helium 10</h4>
              <button
                className="bg-white text-black px-4 py-2 rounded-lg font-semibold"
                onClick={() =>
                  trackOutbound({
                    partner: 'helium10',
                    url: 'https://i.helium10.com/raPZj3'
                  })
                }
              >
                Sign Up Now
              </button>
            </div>

            {/* PAYONEER */}
            <div className="bg-[#f39c12] p-6 rounded-2xl text-white text-center">
              <img src={partner4_image} alt="Payoneer" className="mx-auto mb-4" />
              <h4 className="font-bold mb-2">Payoneer</h4>
              <button
                className="bg-white text-black px-4 py-2 rounded-lg font-semibold"
                onClick={() =>
                  trackOutbound({
                    partner: 'payoneer',
                    url: 'https://tracking.payoneer.com/aff_ad'
                  })
                }
              >
                Get Started
              </button>
            </div>

            {/* HELLOLEADS */}
            <div className="bg-[#243b53] p-6 rounded-2xl text-white text-center">
              <img src={partner5_image} alt="HelloLeads CRM" className="mx-auto mb-4" />
              <h4 className="font-bold mb-2">HelloLeads CRM</h4>
              <button
                className="bg-white text-black px-4 py-2 rounded-lg font-semibold"
                onClick={() =>
                  trackOutbound({
                    partner: 'helloleads',
                    url: 'https://app.helloleads.io'
                  })
                }
              >
                Claim Offer
              </button>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default About;
