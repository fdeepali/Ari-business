import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function ContactForm() {
  const { state } = useLocation();
  const contactForm = state?.contactForm;

  if (!contactForm) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-slate-50 to-orange-50 px-4 py-10">
        <div className="w-full max-w-sm px-6 py-6 rounded-2xl border border-amber-200 bg-white/80 shadow-lg sm:max-w-md md:max-w-lg">
          <p className="text-sm tracking-wide text-amber-700 text-center">
            No contact form data found.
          </p>
        </div>
      </div>
    );
  }

  const { name, email, phone, storeUrl, goals, submittedAt } = contactForm;

  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-slate-50 to-orange-50 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <motion.div
        className="max-w-3xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="mb-6 lg:mb-8 w-full border border-amber-200 bg-white/90 rounded-2xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7 shadow-[0_18px_45px_rgba(248,191,80,0.25)]">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-900 tracking-wide leading-tight">
            Contact Form{" "}
            <span className="text-amber-600 font-normal">Submission</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Submitted on{" "}
            <span className="text-amber-700 font-medium">
              {new Date(submittedAt).toLocaleString()}
            </span>
          </p>
        </div>

        {/* Contact Card */}
        <motion.div
          className="w-full bg-white/90 rounded-2xl border border-amber-200/80 shadow-[0_25px_65px_rgba(15,23,42,0.08)] p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 lg:space-y-6"
          variants={itemVariants}
          custom={0}
          initial="hidden"
          animate="visible"
        >
          <motion.div custom={1} variants={itemVariants}>
            <Info label="Name" value={name} />
          </motion.div>

          <motion.div custom={2} variants={itemVariants}>
            <Info label="Email" value={email} />
          </motion.div>

          <motion.div custom={3} variants={itemVariants}>
            <Info label="Phone" value={phone} />
          </motion.div>

          <motion.div custom={4} variants={itemVariants}>
            <Info label="Store URL" value={storeUrl} />
          </motion.div>

          <motion.div custom={5} variants={itemVariants}>
            <Info label="Goals" value={goals} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

const Info = ({ label, value }) => (
  <motion.div
    className="group w-full rounded-xl border border-amber-100 bg-amber-50/60 px-4 py-3 sm:px-5 sm:py-4 hover:bg-white hover:border-amber-300 hover:shadow-[0_12px_35px_rgba(248,191,80,0.22)] transition-all duration-200"
    whileHover={{ y: -2, scale: 1.02 }}
  >
    <p className="text-xs sm:text-[10px] md:text-xs uppercase tracking-[0.18em] text-amber-500 mb-1.5 sm:mb-2">
      {label}
    </p>
    <p className="text-sm sm:text-base font-semibold text-slate-900 break-words leading-relaxed line-clamp-3">
      {value || "—"}
    </p>
  </motion.div>
);

export default ContactForm;
