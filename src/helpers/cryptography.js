import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const salt = await bcrypt.genSalt();
const verify = async (payload, cipher) => {
  return bcrypt.compare(payload, cipher);
};
const hash = async (payload) => {
  return bcrypt.hash(payload, salt);
};
const genVerificationToken = async () => {
  return crypto.randomBytes(64).toString("hex");
};
const generateJWT = (payload) => {
  // add expiration to the token
  const options = { algorithm: "RS256", expiresIn: "8h" };
  return jwt.sign(payload, process.env.privateKey, options);
};
const verifyJWT = (token) => {
  const options = { algorithm: "RS256", expiresIn: "8h" };
  return jwt.verify(token, process.env.publicKey, options);
};

const decodeJWT = (token) => {
  return jwt.decode(token);
};

export {
  hash,
  verify,
  genVerificationToken,
  generateJWT,
  verifyJWT,
  decodeJWT,
};
