const sgMail = require('@sendgrid/mail');
const User = require('../models/userModel');

exports.sendEmailToAll = async (req, res, next) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    const users = await User.find();
    const emails = users.map((user) => user.email);

    for (const email of emails) {
      const msg = {
        to: email,
        from: 'girimanish963@gmail.com',
        subject: req.body.subject,
        text: req.body.text,
        html: req.body.html,
      };
      await sgMail.send(msg);
    }
    res.status(200).json({
      status: 'success',
      message: `${emails.length} emails sent...!`,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      error: err,
    });
  }
};

exports.sendEmail = async (req, res, next) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  try {
    const user = await User.findById(req.params.id);
    const msg = {
      to: user.email,
      from: 'girimanish963@gmail.com',
      subject: req.body.subject,
      text: req.body.text,
      html: req.body.html,
    };
    await sgMail.send(msg);
    res.status(200).json({
      status: 'success',
      message: `email sent to ${user.email}`,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      error: err,
    });
  }
};
