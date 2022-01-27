import { Router } from "express";
import countryController from "./../controllers/CountryController.js";

import { isAdmin } from "./../middlewares/authorization.js";
import validators from "./../validators/projectDependencies.js";
const routes = new Router();

routes.post("/", isAdmin, validators.country, countryController.create);
routes.get("/", isAdmin, countryController.all);
routes.get("/:id", isAdmin, countryController.read);
routes.get("/:id/regions", isAdmin, countryController.regions);
routes.put("/:id", isAdmin, validators.country, countryController.update);
routes.delete("/:id", isAdmin, countryController.delete);
export default routes;
