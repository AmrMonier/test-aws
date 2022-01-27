import { query } from "express-validator";
const rewardRequest = {
  all: [
    query("status", "invalid status")
      .optional()
      .isIn(["pending", "approved", "rejected"]),
  ],
};

export default rewardRequest;
