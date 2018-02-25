import nodemailer from 'nodemailer';
import { emailCredentials } from '../../../../config/secrets';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: emailCredentials.user,
    pass: emailCredentials.pass
  }
});

export function sendEmail({from, to, subject, text, html, attachments}) {
  const mailOptions = {
    from,
    to,
    subject,
    text,
    html,
    attachments
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
});
}

export default {
  sendEmail
};
