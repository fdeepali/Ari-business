import mongoose from "mongoose";

const QuestionnaireSchema = new mongoose.Schema({
  contactInfo: {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, trim: true },
    country: { type: String, required: true, trim: true },
    pincode: { type: String, trim: true }
  },

  businessDetails: {
    businessType: { type: String, enum: ["Trader", "Manufacturer"], required: true },

    // Yes / No converted to Boolean
    hasLogo: { type: Boolean, required: true },
    hasTrademark: { type: Boolean, required: true },
    isRegisteredBrand: { type: Boolean, required: true },
    isPrivateLimited: { type: Boolean, required: true },

    partnerCount: {
      type: String,
      enum: ["1", "2-5", "6-10", "More than 10"],
      required: true
    },

    productCategory: {
      type: String,
      enum: [
        "Apparel & Fashion",
        "Electronics",
        "Food & Beverages",
        "Furniture & Home Decor",
        "Industrial Supplies",
        "Health & Beauty",
        "Handicrafts",
        "Others"
      ],
      required: true
    },

    categoryOther: { type: String, trim: true },

    tradeType: {
      type: String,
      enum: [
        "Domestic",
        "International (We can help you obtain an IEC code)"
      ],
      required: true
    },

    hasMediaAssets: { type: Boolean, required: true }
  },

  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model("QuestionnaireSubmission", QuestionnaireSchema);
