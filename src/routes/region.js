import { Router } from "express";
import regionController from "../controllers/RegionController.js";

import { isAdmin } from "../middlewares/authorization.js";
import validators from "../validators/projectDependencies.js";
const routes = new Router();

routes.post("/", isAdmin, validators.region, regionController.create);
routes.get("/", isAdmin, regionController.all);
routes.get("/:id", isAdmin, regionController.read);
routes.put("/:id", isAdmin, validators.region, regionController.update);
routes.delete("/:id", isAdmin, regionController.delete);
export default routes;
