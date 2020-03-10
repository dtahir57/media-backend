const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "148a82601eee62",
    pass: "970df31d3b5644"
  }
});

module.exports = transporter;