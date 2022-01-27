import { Router } from "express";

import {
  isAdmin,
  isUser,
  isMobileApp,
  isMobileOrAdmin,
} from "./../middlewares/authorization.js";
import rewardsController from "./../controllers/RewardsController.js";
import rewardValidator from "./../validators/reward.js";
import { uploadPhoto } from "./../helpers/fileUploader.js";
const routes = new Router();

routes.post(
  "/",

  isAdmin,
  uploadPhoto,
  rewardValidator.data,
  rewardsController.create
);
routes.get("/", isMobileOrAdmin, rewardsController.all);
routes.get("/:id", isAdmin, rewardsController.read);
routes.put(
  "/:id",

  isAdmin,
  uploadPhoto,
  rewardValidator.data,
  rewardsController.update
);
routes.delete("/:id", isAdmin, rewardsController.delete);
routes.post(
  "/:id/request",
  isMobileApp,

  isUser,
  rewardsController.request
);

export default routes;
