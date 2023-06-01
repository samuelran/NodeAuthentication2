const nodemailer = require('nodemailer');

const sendWelcomemail = async options => {

    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });

    let info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      text: options.text
    });

    console.log(`Message sent: ${info.messageId}`);
  };

module.exports = sendWelcomemail;