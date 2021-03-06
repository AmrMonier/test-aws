import { check } from "express-validator";
import Client from "./../models/Client.js";
const ClientAuth = {
  register: [
    check("name", "name must be at least 3 characters long")
      .trim()
      .matches(
        /^(?:[a-zA-Z0-9\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){0,30}$/
      )
      .withMessage("Name can contain only Arabic or English letters")
      .isLength({ min: 3 }),
    check("phoneNumber")
      .isNumeric()
      .matches(
        /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/
      )
      .withMessage("invalid phone number"),
    check("email", "invalid email")
      .normalizeEmail({ gmail_remove_dots: false })
      .isEmail()
      .custom(async (email) => {
        return Client.findOne({
          email,
        }).then((client) => {
          if (client) {
            return Promise.reject();
          }
        });
      })
      .withMessage("this email already exists"),
    check("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("password must be at least 8 chracters"),
    check("password_confirmation")
      .custom(async (value, { req }) => {
        const { password } = req.body;
        if (password !== value) {
          return Promise.reject();
        }
      })
      .withMessage("Password dosen't match"),
  ],
  login: [
    check("email", "invalid email")
      .normalizeEmail({ gmail_remove_dots: false })
      .isEmail(),
    check("password", "password must be provided").notEmpty(),
  ],
  resetPassword: [
    check("email", "invalid email")
      .isEmail()
      .custom(async (email) => {
        return Client.findOne({
          email,
        }).then((client) => {
          if (!client) {
            return Promise.reject();
          }
        });
      })
      .withMessage("this email doesn't exist"),
  ],
  updatePassword: [
    check("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("password must be at least 8 chracters"),
    check("password_confirmation")
      .custom(async (value, { req }) => {
        const { password } = req.body;
        if (password !== value) {
          return Promise.reject();
        }
      })
      .withMessage("Password dosen't match"),
  ],
  create: [
    check("name", "name must be at least 3 characters long")
      .trim()
      .matches(
        /^(?:[a-zA-Z0-9\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){0,30}$/
      )
      .withMessage("Name can contain only Arabic or English letters")
      .isLength({ min: 3 }),

    check("phoneNumber")
      .isNumeric()
      .matches(
        /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/
      )
      .withMessage("invalid phone number"),
    check("email", "invalid email")
      .normalizeEmail({ gmail_remove_dots: false })
      .isEmail()
      .custom(async (email) => {
        return Client.findOne({
          email,
        }).then((client) => {
          if (client) {
            return Promise.reject();
          }
        });
      })
      .withMessage("this email already exists"),
  ],
  update: [
    check("name", "name must be at least 3 characters long")
      .trim()
      .matches(
        /^(?:[a-zA-Z0-9\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){0,30}$/
      )
      .withMessage("Name can contain only Arabic or English letters")
      .isLength({ min: 3 }),

    check("phoneNumber")
      .isNumeric()
      .matches(
        /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/
      )
      .withMessage("invalid phone number"),
  ],
};

export default ClientAuth;
