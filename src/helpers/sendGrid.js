import sendGrid from "@sendgrid/mail";
import {
  resetPasswordTemplate,
  resetConfirmationTemplate,
  verifyEmailTemplate,
  sendOtpTemplate,
} from "./mailTemplates.js";
sendGrid.setApiKey(process.env.SG_KEY);
const sendMail = (to, subject, content) => {
  return sendGrid.send({
    to,
    from: process.env.SG_SENDER,
    subject,
    html: content,
  });
};

const sendResetPasswordMail = (user, token) => {
  return sendGrid.send({
    to: user.email,
    from: process.env.SG_SENDER,
    subject: "Password reset request",
    html: resetPasswordTemplate(token, user.name),
  });
};
const confirmPasswordResetedMail = (user) => {
  return sendGrid.send({
    to: user.email,
    from: process.env.SG_SENDER,
    subject: "Password reseted successfully",
    html: resetConfirmationTemplate(user.name),
  });
};
const sendVerificationMail = (user, token) => {
  return sendGrid.send({
    to: user.email,
    from: process.env.SG_SENDER,
    subject: "Verify your Account",
    html: verifyEmailTemplate(user.name, token),
  });
};
const sendOTP = (user, subject) => {
  return sendGrid.send({
    to: user.email,
    from: process.env.SG_SENDER,
    subject,
    html: sendOtpTemplate(user.name, user.otp),
  });
};
export {
  sendMail,
  sendResetPasswordMail,
  confirmPasswordResetedMail,
  sendVerificationMail,
  sendOTP
};
