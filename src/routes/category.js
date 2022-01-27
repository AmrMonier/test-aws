import { Router } from "express";
import categoryController from "../controllers/CategoryController.js";

import { isAdmin } from "../middlewares/authorization.js";
import validators from "../validators/projectDependencies.js";
const routes = new Router();

routes.post("/", isAdmin, validators.category, categoryController.create);
routes.get("/", isAdmin, categoryController.all);
routes.get("/:id", isAdmin, categoryController.read);
routes.put("/:id", isAdmin, validators.category, categoryController.update);
routes.delete("/:id", isAdmin, categoryController.delete);
export default routes;
