import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, TrendingUp, ShieldCheck, Star, Award, Users } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80 }
  }
};

// Color mapping
const colorMap = {
  blue: { text: 'text-blue-600', border: 'border-blue-500', icon: Smile },
  green: { text: 'text-green-600', border: 'border-green-500', icon: TrendingUp },
  purple: { text: 'text-purple-600', border: 'border-purple-500', icon: ShieldCheck },
  yellow: { text: 'text-yellow-600', border: 'border-yellow-500', icon: Star },
  red: { text: 'text-red-600', border: 'border-red-500', icon: Award },
  gray: { text: 'text-gray-600', border: 'border-gray-500', icon: Users }
};

const fallbackTestimonials = [
  {
    _id: 'f1',
    quote: "Rahul's expertise helped us scale on Amazon massively.",
    author: 'Julie, Founder',
    company: 'Eco-Friendly Home Goods',
    color: 'blue'
  },
  {
    _id: 'f2',
    quote: "Global expansion became easy with Rahul’s strategy.",
    author: 'John, CEO',
    company: 'Clothing Brand',
    color: 'green'
  },
  {
    _id: 'f3',
    quote: "A complete game-changer for our Amazon growth.",
    author: 'Sarah, Director',
    company: 'Electronics Startup',
    color: 'purple'
  }
];

function Testimonials() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    console.log('[TESTIMONIALS] Fetching...');

    fetch(`${BACKEND_URL}/api/content/testimonials`)
      .then(async (res) => {
        console.log('[TESTIMONIALS] Status:', res.status);

        const data = await res.json();
        console.log('[TESTIMONIALS] Data:', data);

        if (data?.success && Array.isArray(data.data) && data.data.length > 0) {
          console.log('[TESTIMONIALS] Loaded from API:', data.data.length);
          setTestimonials(data.data);
        } else {
          console.warn('[TESTIMONIALS] Using fallback data');
        }
      })
      .catch((err) => {
        console.error('[TESTIMONIALS] Error:', err);
      });
  }, []);

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center mb-16 text-center md:text-left"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-800"
            variants={itemVariants}
          >
            Testimonials: Satisfied Clients
          </motion.h1>

          <motion.div variants={itemVariants} className="mt-6 md:mt-0">
            <p className="text-sm text-gray-500 font-medium">
              High Customer Satisfaction
            </p>
          </motion.div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {testimonials.map((t, index) => {
            console.log('[TEST ITEM]', t);

            const scheme = colorMap[t.color] || colorMap.blue;
            const Icon = scheme.icon;

            return (
              <motion.div
                key={t._id || index}
                className={`flex flex-col h-full bg-white p-6 border-l-4 shadow-md rounded-lg hover:shadow-xl transition ${scheme.border}`}
                variants={itemVariants}
              >
                <div className="flex-grow">
                  <Icon size={28} className={`mb-4 ${scheme.text}`} />

                  <p className="text-gray-700 mb-6 italic">
                    “{t.quote || 'No quote provided'}”
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="font-semibold text-gray-800">
                    - {t.author || 'Unknown'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t.company || ''}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

export default Testimonials;