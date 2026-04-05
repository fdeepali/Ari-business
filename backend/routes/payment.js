import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// POST /api/payment/create-order
router.post('/create-order', async (req, res) => {
  console.log('[PAYMENT] Create order request:', {
    email: req.body.email,
    time: new Date().toISOString()
  });

  try {
    const amount = parseInt(process.env.QUESTIONNAIRE_AMOUNT) || 499900; // in paise
    const currency = process.env.QUESTIONNAIRE_CURRENCY || 'INR';

    console.log('[PAYMENT] Creating Razorpay order:', {
      amount,
      currency
    });

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: `receipt_${Date.now()}`,
      notes: { email: req.body.email || '' }
    });

    console.log('[PAYMENT] Order created successfully:', {
      orderId: order.id,
      amount: order.amount
    });

    res.json({ success: true, data: order });

  } catch (err) {
    console.error('[PAYMENT] Razorpay order error:', err);

    res.status(500).json({
      success: false,
      message: 'Failed to create order'
    });
  }
});

// POST /api/payment/verify-payment
router.post('/verify-payment', (req, res) => {
  console.log('[PAYMENT] Verify request:', {
    orderId: req.body.razorpay_order_id,
    paymentId: req.body.razorpay_payment_id,
    time: new Date().toISOString()
  });

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    console.log('[PAYMENT] Signature comparison:', {
      expectedSignature,
      receivedSignature: razorpay_signature
    });

    if (expectedSignature !== razorpay_signature) {
      console.warn('[PAYMENT] Signature mismatch:', {
        orderId: razorpay_order_id
      });

      return res.status(400).json({
        success: false,
        message: 'Payment signature mismatch'
      });
    }

    console.log('[PAYMENT] Payment verified successfully:', {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id
    });

    res.json({
      success: true,
      message: 'Payment verified'
    });

  } catch (err) {
    console.error('[PAYMENT] Verification error:', err);

    res.status(500).json({
      success: false,
      message: 'Verification failed'
    });
  }
});

export default router;