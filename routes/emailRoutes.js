const express = require('express');
const emailController = require('../controllers/emailController');

const router = express.Router();

// POST /api/v1/email [To send email to every subscribers]
router.route('/').post(emailController.sendEmailToAll);

// POST /api/v1/email/:id [to send email to a particular user by his/her Id]
router.route('/:id').post(emailController.sendEmail);

module.exports = router;
