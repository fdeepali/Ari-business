import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `group block px-5 py-3 rounded-xl transition-all duration-200 flex items-center space-x-3 ${
      isActive
        ? "bg-amber-50 border-amber-300 shadow-[0_8px_25px_rgba(248,191,80,0.3)] text-amber-800 font-semibold"
        : "text-slate-600 hover:bg-amber-50/70 hover:text-amber-700 hover:border-amber-200 hover:shadow-[0_4px_15px_rgba(248,191,80,0.15)] border-transparent"
    } border`;

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
    exit: { x: "-100%" },
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-amber-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl shadow flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <span className="font-semibold text-slate-900">
            Admin Panel
          </span>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="text-2xl text-amber-600"
        >
          ☰
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 min-h-screen bg-gradient-to-b from-white/90 via-amber-50/90 to-orange-50/80 border-r border-amber-100 shadow-[0_20px_60px_rgba(248,191,80,0.12)]">
        <SidebarContent linkClasses={linkClasses} />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              className="fixed top-0 left-0 z-50 w-72 min-h-screen bg-gradient-to-b from-white via-amber-50 to-orange-50 shadow-2xl"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <SidebarContent
                linkClasses={linkClasses}
                onNavigate={() => setOpen(false)}
                showClose
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

/* ---------------- Sidebar Content ---------------- */

const SidebarContent = ({ linkClasses, onNavigate, showClose }) => (
  <>
    {/* Header */}
    <div className="p-6 border-b border-amber-100 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl shadow-lg flex items-center justify-center">
          <span className="text-lg font-bold text-white">A</span>
        </div>

        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Admin <span className="text-amber-600">Panel</span>
          </h1>
          <p className="text-xs font-semibold text-amber-500 tracking-[0.18em] uppercase">
            ARI Business Network
          </p>
        </div>
      </div>

      {showClose && (
        <button
          onClick={onNavigate}
          className="text-xl text-amber-600"
        >
          ✕
        </button>
      )}
    </div>

    {/* Navigation */}
    <nav className="px-2 py-6 space-y-1">
      <NavLink to="/" onClick={onNavigate} className={linkClasses}>
        📊 <span>URL Stats</span>
      </NavLink>

      <NavLink
        to="/contact-forms"
        onClick={onNavigate}
        className={linkClasses}
      >
        ✉️ <span>Contact Forms</span>
      </NavLink>

      <NavLink
        to="/questionnaires"
        onClick={onNavigate}
        className={linkClasses}
      >
        📋 <span>Questionnaires</span>
      </NavLink>
    </nav>
  </>
);

export default Sidebar;
