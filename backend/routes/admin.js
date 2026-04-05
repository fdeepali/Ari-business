import express from 'express';
import jwt from 'jsonwebtoken';
import Contact from '../models/Contact.js';
import Questionnaire from '../models/Questionnaire.js';
import Testimonial from '../models/Testimonial.js';
import Service from '../models/Service.js';
import { verifyAdmin } from '../middleware/auth.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// POST /api/admin/login
router.post('/login', (req, res) => {
  console.log('[LOGIN] Request received:', {
    username: req.body.username,
    time: new Date().toISOString()
  });

  const { username, password } = req.body;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    console.warn('[LOGIN] Invalid credentials attempt:', { username });
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '8h' });

  console.log('[LOGIN] Success:', { username });

  res.json({ success: true, token });
});

// GET /api/admin/contacts
router.get('/contacts', verifyAdmin, async (req, res) => {
  console.log('[CONTACTS] Fetch request:', {
    query: req.query,
    time: new Date().toISOString()
  });

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      Contact.find().sort({ submittedAt: -1 }).skip(skip).limit(limit),
      Contact.countDocuments()
    ]);

    console.log('[CONTACTS] Data fetched:', {
      page,
      limit,
      returned: contacts.length,
      total
    });

    res.json({
      success: true,
      data: contacts,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (err) {
    console.error('[CONTACTS] Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/admin/questionnaires
router.get('/questionnaires', verifyAdmin, async (req, res) => {
  console.log('[QUESTIONNAIRES] Fetch request:', {
    query: req.query,
    time: new Date().toISOString()
  });

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [questionnaires, total] = await Promise.all([
      Questionnaire.find().sort({ submittedAt: -1 }).skip(skip).limit(limit),
      Questionnaire.countDocuments()
    ]);

    console.log('[QUESTIONNAIRES] Data fetched:', {
      page,
      limit,
      returned: questionnaires.length,
      total
    });

    res.json({
      success: true,
      data: questionnaires,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (err) {
    console.error('[QUESTIONNAIRES] Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/admin/stats
router.get('/stats', verifyAdmin, async (req, res) => {
  try {
    const [contacts, questionnaires, testimonials, services] = await Promise.all([
      Contact.countDocuments(),
      Questionnaire.countDocuments(),
      Testimonial.countDocuments(),
      Service.countDocuments()
    ]);
    res.json({ success: true, contacts, questionnaires, testimonials, services });
  } catch (err) {
    console.error('[STATS] Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── TESTIMONIALS CRUD ────────────────────────────────────────────────────────

// GET /api/admin/testimonials
router.get('/testimonials', verifyAdmin, async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/admin/testimonials
router.post('/testimonials', verifyAdmin, async (req, res) => {
  try {
    const { quote, author, company, color, order, active } = req.body;
    if (!quote || !author || !company) {
      return res.status(400).json({ success: false, message: 'quote, author and company are required' });
    }
    const t = new Testimonial({ quote, author, company, color, order, active });
    await t.save();
    res.json({ success: true, data: t });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/admin/testimonials/:id
router.put('/testimonials/:id', verifyAdmin, async (req, res) => {
  try {
    const t = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!t) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: t });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/admin/testimonials/:id
router.delete('/testimonials/:id', verifyAdmin, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── SERVICES CRUD ────────────────────────────────────────────────────────────

// GET /api/admin/services
router.get('/services', verifyAdmin, async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/admin/services
router.post('/services', verifyAdmin, async (req, res) => {
  try {
    const { title, description, highlight, features, category, icon, order, active } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'title and description are required' });
    }
    const s = new Service({ title, description, highlight, features, category, icon, order, active });
    await s.save();
    res.json({ success: true, data: s });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/admin/services/:id
router.put('/services/:id', verifyAdmin, async (req, res) => {
  try {
    const s = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!s) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: s });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/admin/services/:id
router.delete('/services/:id', verifyAdmin, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;