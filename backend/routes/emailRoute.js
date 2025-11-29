const express = require('express');

const {submitQuestionnaire} = require('../controllers/questionnaireController.js');

const router = express.Router();

router.post('/send-email-to-admin', submitQuestionnaire);

module.exports = router;