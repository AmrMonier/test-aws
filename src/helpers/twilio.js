import { config } from "dotenv";
config();
import twilio from "twilio";
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = twilio(accountSid, authToken);

const sendOTP = (otp, phoneNumber) => {
  return client.messages.create({
    to: phoneNumber,
    from: "Marketeers",
    body: `Welcome to Marketeers your verification code is ${otp}`,
  });
};

const checkPhoneNumber = (phoneNumber) => {
  return client.lookups.v1.phoneNumbers(phoneNumber).fetch();
};

export { sendOTP, checkPhoneNumber };
