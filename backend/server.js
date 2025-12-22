import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Contact from "./models/Contact.js";

dotenv.config();

const app = express();

// ---------------- MIDDLEWARE ----------------
app.use(cors());
app.use(express.json());

// ---------------- MONGODB ----------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ---------------- CONTACT FORM ROUTE (INLINE) ----------------
app.post("/api/contact-form", async (req, res) => {
  try {
    console.log("✅ /api/contact-form hit");
    console.log("Headers:", req.headers["content-type"]);
    console.log("Body:", req.body);

    const { name, email, phone, storeUrl, goals } = req.body;

    if (!name || !email || !phone || !goals) {
      return res.status(400).json({
        success: false,
        message: "Missing required contact fields",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      storeUrl,
      goals,
    });

    console.log("📩 Contact saved:", contact._id);

    return res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      id: contact._id,
    });
  } catch (err) {
    console.error("❌ Contact form error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to submit contact form",
    });
  }
});

import QuestionnaireSubmission from "./models/DB_Questionnaire.js";
// ---------------- QUESTIONNAIRE ROUTE (INLINE) ----------------
app.post("/api/questionnaire", async (req, res) => {
  try {
    console.log("✅ /api/questionnaire hit");
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Body:", req.body);

    const { contactInfo, businessDetails } = req.body;

    // ---------------- VALIDATION ----------------
    if (
      !contactInfo ||
      !contactInfo.name ||
      !contactInfo.email ||
      !contactInfo.phone
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required contactInfo fields (name, email, phone)",
      });
    }

    if (
      !businessDetails ||
      typeof businessDetails !== "object" ||
      Object.keys(businessDetails).length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "businessDetails is required and cannot be empty",
      });
    }

    // ---------------- SAVE TO DB ----------------
    const submission = await QuestionnaireSubmission.create({
      contactInfo: {
        name: contactInfo.name,
        email: contactInfo.email,
        phone: contactInfo.phone,
        businessName: contactInfo.businessName || "",
      },
      businessDetails,
    });

    console.log("📊 Questionnaire saved:", submission._id);

    return res.status(201).json({
      success: true,
      message: "Questionnaire submitted successfully",
      id: submission._id,
    });

  } catch (err) {
    console.error("❌ Questionnaire error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to submit questionnaire",
    });
  }
});


// ---------------- HEALTH CHECK ----------------
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
