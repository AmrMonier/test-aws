import { check,param } from "express-validator";
import RewardProvider from "../models/RewardProvider.js";
const rewardProviderValidator = {
  create: [
    check("name", "Name is required")
      .trim()
      .isLength({ min: 3 })
      .withMessage("the name must be at least 3 character"),
    check("email", "invalid email")
      .normalizeEmail({ gmail_remove_dots: false })
      .isEmail()
      .custom(async (email) => {
        return RewardProvider.findOne({
          email,
        }).then((provider) => {
          if (provider) {
            return Promise.reject();
          }
        });
      })
      .withMessage("this email already exists"),
  ],
  update: [
    check("name", "Name is required")
      .trim()
      .isLength({ min: 3 })
      .withMessage("the name must be at least 3 character"),
    
    check("email", "invalid email")
      .normalizeEmail({ gmail_remove_dots: false })
      .isEmail()
      .custom(async (email, { req }) => {
        const { id } = req.params;
        return RewardProvider.findOne({
          _id: { $ne: id },
          email,
        }).then((provider) => {
          if (provider) {
            return Promise.reject();
          }
        });
      })
      .withMessage("this email already exists"),
  ],
};

export default rewardProviderValidator;
