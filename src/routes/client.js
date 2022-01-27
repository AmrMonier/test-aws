import { Router } from "express";

import clientValidators from "./../validators/clientAuth.js";
import clientController from "./../controllers/ClientController.js";
import { isAdmin, isClient } from "./../middlewares/authorization.js";
const routes = new Router();
routes.post("/register", clientValidators.register, clientController.register);
routes.get("/verify/:token", clientController.verify);
routes.post("/login", clientValidators.login, clientController.login);
routes.post(
  "/create",

  isAdmin,
  clientValidators.create,
  clientController.create
);
routes.post(
  "/reset-password",
  clientValidators.resetPassword,
  clientController.resetPassword
);
routes.post(
  "/update-password",
  clientValidators.updatePassword,
  clientController.updatePassword
);
routes.get("/me", isClient, clientController.me);
routes.put("/me", isClient, clientValidators.update, clientController.update);
routes.put(
  "/me/reset-password",
  isClient,
  clientValidators.updatePassword,
  clientController.changePassword
);
routes.get("/all", isAdmin, clientController.all);
export default routes;
