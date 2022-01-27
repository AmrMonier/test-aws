import { Router } from "express";

import AdminController from "../controllers/AdminController.js";
import AuthValidators from "../validators/adminAuth.js";
import { isAdmin, isSuperAdmin } from "../middlewares/authorization.js";

const routes = new Router();

routes.post("/login", AuthValidators.login, AdminController.login);
routes.post(
  "/create",

  isSuperAdmin,
  AuthValidators.create,
  AdminController.createAccount
);
routes.post(
  "/reset-password",
  AuthValidators.resetPassword,
  AdminController.resetPassword
);
routes.post(
  "/update-password",
  AuthValidators.updatePassword,
  AdminController.updatePassword
);
routes.get("/me", isAdmin, AdminController.me);
routes.put("/me", isAdmin, AuthValidators.update, AdminController.update);
routes.put("/me/reset-password", isAdmin, AuthValidators.updatePassword, AdminController.changePassword);
export default routes;
