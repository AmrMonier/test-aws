import { Router } from "express";

import rewardRequestController from "../controllers/RewardRequestController.js";
import { isAdmin } from "../middlewares/authorization.js";
import validator from "../validators/rewardRequest.js";
const routes = new Router();

routes.get("/", isAdmin, validator.all, rewardRequestController.all);
routes.get("/:id", isAdmin, rewardRequestController.read);
routes.put(
  "/:id/approve",

  isAdmin,
  rewardRequestController.approve
);
routes.put(
  "/:id/reject",

  isAdmin,
  rewardRequestController.reject
);
export default routes;
