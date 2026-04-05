import mongoose from 'mongoose';

const questionnaireSchema = new mongoose.Schema({
  contactInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    businessName: { type: String, default: '' }
  },
  businessDetails: { type: mongoose.Schema.Types.Mixed, required: true },
  payment: {
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
    amount: Number,
    currency: String,
    status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' }
  },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Questionnaire', questionnaireSchema);
