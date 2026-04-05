import express from 'express';
import Testimonial from '../models/Testimonial.js';
import Service from '../models/Service.js';

const router = express.Router();

// GET /api/content/testimonials — public, for frontend
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ active: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/content/services — public, for frontend
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find({ active: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
