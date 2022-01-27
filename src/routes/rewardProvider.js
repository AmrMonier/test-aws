import { Router } from "express";

import rewardProviderController from "./../controllers/RewardProviderController.js";
import { isAdmin } from "./../middlewares/authorization.js";
import rewardProviderValidator from "./../validators/rewardProvider.js";
const routes = new Router();

// Add routes
routes.post(
  "/",

  isAdmin,
  rewardProviderValidator.create,
  rewardProviderController.create
);
routes.get("/", isAdmin, rewardProviderController.all);
routes.put(
  "/:id",

  isAdmin,
  rewardProviderValidator.update,
  rewardProviderController.update
);
routes.get("/:id", isAdmin, rewardProviderController.read);
routes.delete("/:id", isAdmin, rewardProviderController.delete);
export default routes;
