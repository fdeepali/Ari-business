import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  storeUrl: { type: String, default: '' },
  goals: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Contact', contactSchema);
