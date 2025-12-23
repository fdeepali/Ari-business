import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function UrlStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const toastShown = useRef(false);

  const fetchStats = async () => {
    try {
      const { data } = await axios.get("https://ari-business-network-3.onrender.com/api/links", {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      });

      if (data.success) {
        setStats(data.data);
        toast.success("URL stats fetched successfully!");
        toastShown.current = true;
      }
    } catch (error) {
      console.log("Error fetching URL stats:", error);
      toast.error("Internal server error!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
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
        className="w-full max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="mb-6 lg:mb-10 w-full border border-amber-200 bg-white/90 rounded-2xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7 shadow-[0_20px_50px_rgba(248,191,80,0.22)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3 flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl shadow-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg sm:text-xl font-bold text-white">📊</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                URL{" "}
                <span className="text-amber-600">Statistics</span>
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Track how many times each URL has been visited
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
            <p className="text-lg text-amber-700 mt-4 font-medium">Loading URL stats...</p>
          </motion.div>
        ) : stats.length === 0 ? (
          <motion.div
            className="text-center py-16 sm:py-20 bg-white/80 rounded-2xl border border-amber-100 shadow-lg w-full mx-auto max-w-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl sm:text-3xl text-amber-400">🔗</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No data available</h3>
            <p className="text-slate-500">URL statistics will appear here when links are visited.</p>
          </motion.div>
        ) : (
          <motion.div
            className="w-full bg-white/90 rounded-3xl border border-amber-200/80 shadow-[0_25px_70px_rgba(15,23,42,0.08)] overflow-hidden"
            variants={tableVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-amber-100">
                <thead className="bg-gradient-to-r from-amber-50 to-orange-50">
                  <tr>
                    <th className="px-6 lg:px-8 py-4 lg:py-5 text-left text-xs font-bold text-amber-700 uppercase tracking-[0.2em]">
                      #
                    </th>
                    <th className="px-6 lg:px-8 py-4 lg:py-5 text-left text-xs font-bold text-amber-700 uppercase tracking-[0.2em]">
                      Name
                    </th>
                    <th className="px-6 lg:px-8 py-4 lg:py-5 text-left text-xs font-bold text-amber-700 uppercase tracking-[0.2em]">
                      URL
                    </th>
                    <th className="px-6 lg:px-8 py-4 lg:py-5 text-center text-xs font-bold text-amber-700 uppercase tracking-[0.2em]">
                      Clicks
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-50">
                  {stats.map((item, index) => (
                    <motion.tr
                      key={item._id}
                      custom={index}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      className="group hover:bg-amber-50/70 transition-all duration-200 hover:shadow-[0_8px_25px_rgba(248,191,80,0.15)]"
                    >
                      <td className="px-6 lg:px-8 py-5 lg:py-6 text-sm font-semibold text-slate-700">
                        {index + 1}
                      </td>
                      <td className="px-6 lg:px-8 py-5 lg:py-6 font-semibold text-base lg:text-lg text-slate-900 group-hover:text-amber-700">
                        {item.name}
                      </td>
                      <td className="px-6 lg:px-8 py-5 lg:py-6">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-amber-600 hover:text-amber-700 font-medium break-all hover:underline group-hover:translate-x-1 transition-all duration-200 line-clamp-1"
                          title={item.url}
                        >
                          {item.url}
                        </a>
                      </td>
                      <td className="px-6 lg:px-8 py-5 lg:py-6 text-center">
                        <motion.span
                          className="inline-flex items-center justify-center px-3 py-1.5 lg:px-4 lg:py-2 text-sm font-bold text-white bg-gradient-to-r from-amber-400 to-amber-500 rounded-full shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.count}
                        </motion.span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile/Tablet Cards */}
            <div className="lg:hidden divide-y divide-amber-100">
              {stats.map((item, index) => (
                <motion.div
                  key={item._id}
                  custom={index}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  className="group p-4 lg:p-6 hover:bg-amber-50/70 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3 gap-3">
                    <span className="text-sm font-semibold text-slate-700 bg-amber-100 px-2 py-1 rounded-full flex-shrink-0">
                      #{index + 1}
                    </span>
                    <motion.span
                      className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-bold text-white bg-gradient-to-r from-amber-400 to-amber-500 rounded-full shadow-lg flex-shrink-0"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.count}
                    </motion.span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-amber-700">
                    {item.name}
                  </h3>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-amber-600 hover:text-amber-700 font-medium break-all line-clamp-2 hover:underline block mb-2"
                    title={item.url}
                  >
                    {item.url}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default UrlStats;
