import QuestionnaireSubmission from "../models/DB_Questionnaire.js";
import { sendEmail } from "./emailController.js";

export const submitQuestionnaire = async (req, res) => {
  try {
    console.log("✅ submitQuestionnaire HIT");
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("[QUESTIONNAIRE] Body:", req.body);

    const { contactInfo, businessDetails } = req.body;

    // ---------------- VALIDATION ----------------
    if (!contactInfo?.name || !contactInfo?.email || !contactInfo?.phone) {
      return res.status(400).json({
        success: false,
        message: "Missing required contact information",
      });
    }

    if (!businessDetails || Object.keys(businessDetails).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Business details are required",
      });
    }

    // ---------------- SAVE TO DB ----------------
    const saved = await QuestionnaireSubmission.create({
      contactInfo,
      businessDetails,
    });

    console.log("[QUESTIONNAIRE] Saved:", saved._id);


    return res.status(201).json({
      success: true,
      message: "Questionnaire submitted successfully",
      id: saved._id,
    });

  } catch (err) {
    console.error("[QUESTIONNAIRE] Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while submitting questionnaire",
    });
  }
};
