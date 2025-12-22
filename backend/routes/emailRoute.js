import express from "express";
import Contact from "../models/Contact.js";
import { submitQuestionnaire } from "../controllers/newQuestionnaireController.js";

const router = express.Router();
console.log("📦 emailRoute.js loaded");
router.post("/contact-form", async (req, res) => {
  try {
    console.log("✅ /contact-form hit");
    console.log("Content-Type:", req.headers["content-type"]);
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

router.post("/questionnaire", submitQuestionnaire);

export default router;
