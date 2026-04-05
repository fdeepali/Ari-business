import express from 'express';
import crypto from 'crypto';
import Questionnaire from '../models/Questionnaire.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// POST /api/questionnaire - Save ONLY after verified Razorpay payment
router.post('/', async (req, res) => {
  console.log('[QUESTIONNAIRE] Incoming request:', {
    email: req.body?.contactInfo?.email,
    time: new Date().toISOString()
  });

  try {
    const { contactInfo, businessDetails, payment } = req.body;

    // Validate contact info
    if (!contactInfo?.name || !contactInfo?.email || !contactInfo?.phone) {
      console.warn('[QUESTIONNAIRE] Missing contact info:', contactInfo);

      return res.status(400).json({
        success: false,
        message: 'Missing contact info'
      });
    }

    // Validate payment presence
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = payment || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.warn('[QUESTIONNAIRE] Missing payment details:', payment);

      return res.status(400).json({
        success: false,
        message: 'Payment info required'
      });
    }

    console.log('[QUESTIONNAIRE] Verifying payment:', {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id
    });

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSig = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSig !== razorpay_signature) {
      console.warn('[QUESTIONNAIRE] Invalid payment signature:', {
        orderId: razorpay_order_id
      });

      return res.status(400).json({
        success: false,
        message: 'Payment signature invalid'
      });
    }

    console.log('[QUESTIONNAIRE] Payment verified');

    // Prevent duplicate entries
    const existing = await Questionnaire.findOne({
      'payment.razorpay_payment_id': razorpay_payment_id
    });

    if (existing) {
      console.warn('[QUESTIONNAIRE] Duplicate submission detected:', {
        paymentId: razorpay_payment_id,
        existingId: existing._id
      });

      return res.json({
        success: true,
        message: 'Already saved',
        id: existing._id
      });
    }

    console.log('[QUESTIONNAIRE] Saving questionnaire:', {
      email: contactInfo.email
    });

    const questionnaire = new Questionnaire({
      contactInfo,
      businessDetails,
      payment: {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount: payment.amount,
        currency: payment.currency,
        status: 'paid'
      }
    });

    await questionnaire.save();

    console.log('[QUESTIONNAIRE] Saved successfully:', {
      id: questionnaire._id
    });

    res.json({
      success: true,
      message: 'Questionnaire saved',
      id: questionnaire._id
    });

  } catch (err) {
    console.error('[QUESTIONNAIRE] Error:', err);

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;