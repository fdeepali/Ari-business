import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  highlight: { type: String, default: '' },
  features: [{ type: String }],
  category: {
    type: String,
    enum: ['digital', 'catalog', 'account', 'logistics', 'finance', 'support'],
    default: 'digital'
  },
  icon: { type: String, default: 'Zap' }, // lucide icon name string
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Service', serviceSchema);
