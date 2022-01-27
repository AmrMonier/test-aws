import { Router } from "express";
import panelServiceController from "../controllers/PanelServiceController.js";

import { isAdmin } from "../middlewares/authorization.js";
import validators from "../validators/projectDependencies.js";
const routes = new Router();

routes.post(
  "/",
  isAdmin,
  validators.panelService,
  panelServiceController.create
);
routes.get("/", isAdmin, panelServiceController.all);
routes.get("/:id", isAdmin, panelServiceController.read);
routes.put(
  "/:id",
  isAdmin,
  validators.panelService,
  panelServiceController.update
);
routes.delete("/:id", isAdmin, panelServiceController.delete);
export default routes;
