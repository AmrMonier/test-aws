import { check } from "express-validator";
import RewardProvider from "./../models/RewardProvider.js";
const rewardValidator = {
  data: [
    check("name", "Name is required")
      .trim()
      .isLength({ min: 3 })
      .withMessage("the name must be at least 3 character"),
    check("points")
      .isInt({ min: 1 })
      .withMessage("points can't be zero or less"),
    check("provider")
      .custom(async (id) => {
        if (!id) {
          return Promise.reject();
        }
        return RewardProvider.findById(id)
          .then((provider) => {
            if (!provider) {
              return Promise.reject();
            }
          })
          .catch(() => Promise.reject());
      })
      .withMessage("this provider doesn't exist "),
  ],
};

export default rewardValidator;
