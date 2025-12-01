import express from 'express';
import { submitQuestionnaire } from '../controllers/questionnaireController.js';
import { createOrder, verifyPaymentController } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPaymentController);
router.post('/send-email-to-admin', submitQuestionnaire);
import { sendContactForm } from "../controllers/emailController.js";

router.post("/send-contact-form", async (req, res) => {
  try {
    const { name, email, phone, storeUrl, goals } = req.body;

    await sendContactForm({ name, email, phone, storeUrl, goals });

    return res.status(200).json({
      success: true,
      message: "Contact form submitted successfully",
    });
  } catch (err) {
    console.error("Contact form error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to submit contact form",
    });
  }
});

export default router;