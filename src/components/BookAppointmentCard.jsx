import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BookAppointmentCard() {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white border-2 border-gray-200 rounded-3xl shadow-xl p-10 md:p-14 text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg"
          >
            <CalendarCheck size={44} className="text-black" />
          </motion.div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Book Your Free Amazon Strategy Call
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Speak directly with our Amazon experts. We’ll review your business,
            identify growth opportunities, and guide you with a clear action plan.
          </p>

          {/* CTA Button */}
          <motion.button
            onClick={() => navigate('/book-appointment')}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg
                       bg-gradient-to-r from-yellow-500 to-yellow-600 text-black
                       hover:from-yellow-600 hover:to-yellow-700 shadow-lg"
          >
            Book Appointment
            <ArrowRight size={22} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
