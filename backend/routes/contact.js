import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// POST /api/contact - Save contact form submission
router.post('/', async (req, res) => {
  console.log('[CONTACT SUBMIT] Incoming request:', {
    body: req.body,
    time: new Date().toISOString()
  });

  try {
    const { name, email, phone, storeUrl, goals } = req.body;

    // Validation check
    if (!name || !email || !phone || !goals) {
      console.warn('[CONTACT SUBMIT] Missing fields:', {
        name,
        email,
        phone,
        goals
      });

      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const contact = new Contact({ name, email, phone, storeUrl, goals });

    console.log('[CONTACT SUBMIT] Saving to DB:', {
      name,
      email
    });

    await contact.save();

    console.log('[CONTACT SUBMIT] Saved successfully:', {
      id: contact._id
    });

    res.json({
      success: true,
      message: 'Contact form saved',
      id: contact._id
    });

  } catch (err) {
    console.error('[CONTACT SUBMIT] Error:', err);

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;