import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function ContactFormSubmissions() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const toastShown = useRef(false);

  const fetchSubmissions = async () => {
    try {
      const { data } = await axios.get("https://ari-business-network-3.onrender.com/api/contact-forms", {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      });

      if (data.success) {
        setForms(data.data);
        toast.success("Contact form submissions fetched successfully!");
        toastShown.current = true;
      } else {
        toast.error("Failed to fetch contact form submissions!");
      }
    } catch (error) {
      console.log("Error fetching contact form submissions:", error);
      toast.error("Internal server error!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const tableVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: 0.2 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + 0.05 * i, duration: 0.3 },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-slate-50 to-orange-50 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <motion.div
        className="w-full max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="mb-6 lg:mb-10 w-full border border-amber-200 bg-white/90 rounded-2xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7 shadow-[0_20px_50px_rgba(248,191,80,0.22)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3 flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl shadow-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg sm:text-xl font-bold text-white">✉️</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                Contact Form{" "}
                <span className="text-amber-600">Submissions</span>
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                View all contact form entries
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <motion.div
            className="text-center py-16 sm:py-20 bg-white/80 rounded-2xl border border-amber-100 shadow-lg w-full mx-auto max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-amber-400 mx-auto"></div>
            <p className="text-lg text-amber-700 mt-4 font-medium">Loading submissions...</p>
          </motion.div>
        ) : forms.length === 0 ? (
          <motion.div
            className="text-center py-16 sm:py-20 bg-white/80 rounded-2xl border border-amber-100 shadow-lg w-full mx-auto max-w-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl sm:text-3xl text-amber-400">📭</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No submissions yet</h3>
            <p className="text-slate-500">Contact form submissions will appear here.</p>
          </motion.div>
        ) : (
          <motion.div
            className="w-full bg-white/90 rounded-3xl border border-amber-200/80 shadow-[0_25px_70px_rgba(15,23,42,0.08)] overflow-hidden"
            variants={tableVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full divide-y divide-amber-100">
                <thead className="bg-gradient-to-r from-amber-50 to-orange-50">
                  <tr>
                    <th className="px-6 sm:px-8 py-4 sm:py-5 text-left text-xs font-bold text-amber-700 uppercase tracking-[0.2em]">
                      #
                    </th>
                    <th className="px-6 sm:px-8 py-4 sm:py-5 text-left text-xs font-bold text-amber-700 uppercase tracking-[0.2em]">
                      Name
                    </th>
                    <th className="px-6 sm:px-8 py-4 sm:py-5 text-left text-xs font-bold text-amber-700 uppercase tracking-[0.2em]">
                      Submitted At
                    </th>
                    <th className="px-6 sm:px-8 py-4 sm:py-5 text-center text-xs font-bold text-amber-700 uppercase tracking-[0.2em]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-50">
                  {forms.map((form, index) => (
                    <motion.tr
                      key={form._id}
                      custom={index}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      className="group hover:bg-amber-50/70 transition-all duration-200 hover:shadow-[0_8px_25px_rgba(248,191,80,0.15)]"
                    >
                      <td className="px-6 sm:px-8 py-5 sm:py-6 text-sm font-semibold text-slate-700">
                        {index + 1}
                      </td>
                      <td className="px-6 sm:px-8 py-5 sm:py-6 font-semibold text-base sm:text-lg text-slate-900 group-hover:text-amber-700">
                        {form.name}
                      </td>
                      <td className="px-6 sm:px-8 py-5 sm:py-6 text-sm text-slate-600">
                        {new Date(form.submittedAt).toLocaleString()}
                      </td>
                      <td className="px-6 sm:px-8 py-5 sm:py-6 text-center">
                        <Link
                          to={`/contact-forms/${form._id}`}
                          state={{ contactForm: form }}
                          className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-[0_12px_35px_rgba(248,191,80,0.4)] hover:scale-105 transition-all duration-200 hover:from-amber-500 hover:to-amber-600 whitespace-nowrap"
                        >
                          View Details
                          <span className="ml-1 sm:ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden divide-y divide-amber-100">
              {forms.map((form, index) => (
                <motion.div
                  key={form._id}
                  custom={index}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  className="group p-4 sm:p-6 hover:bg-amber-50/70 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-semibold text-slate-700 bg-amber-100 px-2 py-1 rounded-full">
                      {index + 1}
                    </span>
                    <Link
                      to={`/contact-forms/${form._id}`}
                      state={{ contactForm: form }}
                      className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                      View →
                    </Link>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-amber-700">
                    {form.name}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {new Date(form.submittedAt).toLocaleDateString()} at{" "}
                    {new Date(form.submittedAt).toLocaleTimeString()}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default ContactFormSubmissions;
