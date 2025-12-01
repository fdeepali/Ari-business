import mongoose from "mongoose";

const QuestionnaireSchema = new mongoose.Schema(
  {
    // Contact details from frontend
    contactInfo: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
      businessName: {
        type: String,
        trim: true,
      }
    },

    /**
     * BUSINESS DETAILS (DYNAMIC)
     *
     * This field stores ALL questionnaire answers:
     *
     * - single-choice fields (string)
     * - multiple-choice fields (array of strings)
     * - "Other" fields (string)
     * - conditional fields
     * - boolean-like fields
     * - ANY new questions you add later
     *
     * Example:
     * {
     *   businessType: "Trader",
     *   targetRegions: ["India (IN)", "USA (US)", "Others"],
     *   targetRegions_other: "Singapore",
     *   servicesNeeded: ["PPC", "Listing", "Other"],
     *   servicesNeeded_other: "Custom Support",
     *   productCategory: "Others",
     *   productCategory_other: "Handmade Organic Items",
     *   monthlyBudget: "₹25,000 - ₹50,000"
     * }
     */
    businessDetails: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("QuestionnaireSubmission", QuestionnaireSchema);
