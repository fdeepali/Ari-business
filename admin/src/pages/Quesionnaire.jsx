import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function Quesionnaire() {
  const { state } = useLocation();
  const questionnaire = state?.questionnaire;

  if (!questionnaire) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-slate-50 to-orange-50 px-4 py-10">
        <div className="w-full max-w-sm px-6 py-6 rounded-2xl border border-amber-200 bg-white/80 shadow-lg sm:max-w-md md:max-w-lg">
          <p className="text-sm tracking-wide text-amber-700 text-center">
            No questionnaire data found.
          </p>
        </div>
      </div>
    );
  }

  const { contactInfo, businessDetails, submittedAt } = questionnaire;

  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.12 * i, duration: 0.45, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-slate-50 to-orange-50 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <motion.div
        className="w-full max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="mb-6 lg:mb-8 w-full border border-amber-200 bg-white/90 rounded-2xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7 shadow-[0_18px_45px_rgba(248,191,80,0.25)]">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-900 tracking-wide leading-tight">
            Questionnaire{" "}
            <span className="text-amber-600 font-normal">Submission</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Submitted on{" "}
            <span className="text-amber-700 font-medium">
              {new Date(submittedAt).toLocaleString()}
            </span>
          </p>
        </div>

        {/* Contact Information */}
        <motion.div
          custom={0}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <Section title="Contact Information">
            <Info label="Name" value={contactInfo.name} />
            <Info label="Email" value={contactInfo.email} />
            <Info label="Phone" value={contactInfo.phone} />
            <Info label="Business Name" value={contactInfo.businessName} />
          </Section>
        </motion.div>

        {/* Business Questionnaire */}
        <motion.div
          custom={1}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <Section title="Business Questionnaire">
            <Info label="Business Type" value={businessDetails.businessType} />
            <Info label="Objective" value={businessDetails.objective} />
            <Info
              label="Target Regions"
              value={businessDetails.targetRegions?.join(", ") || "—"}
            />
            <Info
              label="Amazon Account"
              value={businessDetails.hasAmazonAccount}
            />
            <Info
              label="Account Status"
              value={businessDetails.accountStatus}
            />
            <Info
              label="Product Category"
              value={businessDetails.productCategory}
            />
            <Info
              label="Product Source"
              value={businessDetails.productSource}
            />
            <Info label="Trademark" value={businessDetails.hasTrademark} />
            <Info
              label="Brand Registry"
              value={businessDetails.hasBrandRegistry}
            />
            <Info
              label="Restricted Products"
              value={businessDetails.restrictedProducts}
            />
            <Info
              label="Certifications"
              value={businessDetails.certifications}
            />
            <Info
              label="Fulfillment Model"
              value={businessDetails.fulfillmentModel}
            />
            <Info
              label="Product Photography"
              value={businessDetails.hasProductPhotography}
            />
            <Info
              label="Listing Content"
              value={businessDetails.hasListingContent}
            />
            <Info
              label="PPC Experience"
              value={businessDetails.ppcExperience}
            />
            <Info
              label="Services Needed"
              value={businessDetails.servicesNeeded?.join(", ") || "—"}
            />
            <Info
              label="Monthly Budget"
              value={businessDetails.monthlyBudget}
            />
            <Info label="Timeline" value={businessDetails.timeline} />
            <Info
              label="Main Objective"
              value={businessDetails.mainObjective}
            />
          </Section>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

const Section = ({ title, children }) => (
  <div className="mb-6 lg:mb-8 w-full rounded-2xl border border-amber-200/80 bg-white/90 shadow-[0_18px_45px_rgba(15,23,42,0.06)] overflow-hidden">
    <div className="px-4 py-4 sm:px-6 sm:py-4 lg:px-6 lg:py-4 border-b border-amber-100 flex items-center justify-between">
      <h2 className="text-xs sm:text-sm font-semibold tracking-[0.18em] text-amber-700 uppercase">
        {title}
      </h2>
      <span className="h-px w-12 sm:w-16 bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 rounded-full" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 p-4 sm:p-6 lg:p-6 auto-rows-fr">
      {children}
    </div>
  </div>
);

const Info = ({ label, value }) => (
  <motion.div
    className="group w-full rounded-xl border border-amber-100 bg-amber-50/60 px-3 py-3 sm:px-4 sm:py-3 hover:bg-white hover:border-amber-300 hover:shadow-[0_12px_35px_rgba(248,191,80,0.22)] transition-all duration-200 min-h-[72px] flex flex-col justify-between"
    whileHover={{ y: -2, scale: 1.02 }}
  >
    <p className="text-[10px] sm:text-xs uppercase tracking-[0.16em] text-amber-500 mb-1.5 sm:mb-1 leading-tight">
      {label}
    </p>
    <p className="text-xs sm:text-sm lg:text-base font-medium text-slate-900 break-words line-clamp-3 flex-1">
      {value || "—"}
    </p>
  </motion.div>
);

export default Quesionnaire;
