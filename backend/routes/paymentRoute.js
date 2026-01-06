import express from "express";
import crypto from "crypto";
import razorpay from "../config/razorpay.js";

const router = express.Router();

// CREATE ORDER
router.post("/create-order", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const emailHash = crypto
    .createHash("sha1")
    .update(email)
    .digest("hex")
    .slice(0, 10);


    const order = await razorpay.orders.create({
      amount: 5200,
      currency: 'USD',
      receipt: `receipt_${emailHash}`,
    });

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// VERIFY PAYMENT
router.post("/verify-payment", (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Missing payment details",
    });
  }

  const sign = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .digest("hex");

  if (expectedSign === razorpay_signature) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }
});

export default router;
