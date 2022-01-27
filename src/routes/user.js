import { Router } from "express";

import userValidator from "./../validators/userAuth.js";
import userController from "./../controllers/UserController.js";
import {
  isAdmin,
  isMobileApp,
  isUser,
} from "./../middlewares/authorization.js";
import validator from "./../validators/rewardRequest.js";
const routes = new Router();
routes.post(
  "/register",
  isMobileApp,
  userValidator.register,
  userController.register
);
routes.post("/:id/verify", isMobileApp, userController.verify);
routes.post("/login", isMobileApp, userValidator.login, userController.login);

routes.post(
  "/reset-password",
  isMobileApp,
  userValidator.resetPassword,
  userController.resetPassword
);
routes.post(
  "/:id/update-password",
  isMobileApp,
  userValidator.updatePassword,
  userController.updatePassword
);
routes.get(
  "/me/reward-requests",
  isMobileApp,
  isUser,
  validator.all,
  userController.rewardRequests
);
routes.delete(
  "/me/reward-requests/:id",
  isMobileApp,
  isUser,
  userController.deleteRewardRequest
);
routes.get("/me", isMobileApp, isUser, userController.me);
routes.get("/:id", isAdmin, userController.read);
routes.get("/:id/resend-code", isMobileApp, userController.ResendOtp);
routes.put("/:id/restrict", isAdmin, userController.restrict);
routes.put(
  "/me",
  isMobileApp,
  isUser,
  userValidator.update,
  userController.update
);
routes.put(
  "/me/reset-password",
  isMobileApp,
  isUser,
  userValidator.updatePassword,
  userController.changePassword
);
routes.get("/", isAdmin, userController.all);
export default routes;
