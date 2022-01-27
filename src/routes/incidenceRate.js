import { Router } from "express";
import incidenceRateController from "../controllers/IncidenceRateController.js";

import { isAdmin } from "../middlewares/authorization.js";
import validators from "../validators/projectDependencies.js";
const routes = new Router();

routes.post(
  "/",
  isAdmin,
  validators.incidenceRate,
  incidenceRateController.create
);
routes.get("/", isAdmin, incidenceRateController.all);
routes.get("/:id", isAdmin, incidenceRateController.read);
routes.put(
  "/:id",
  isAdmin,
  validators.incidenceRate,
  incidenceRateController.update
);
routes.delete("/:id", isAdmin, incidenceRateController.delete);
export default routes;
