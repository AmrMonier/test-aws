import { Router } from "express";
import educationController from "./../controllers/EducationController.js";

import { isAdmin } from "./../middlewares/authorization.js";
import validators from "./../validators/projectDependencies.js";
const routes = new Router();

routes.post("/", isAdmin, validators.education, educationController.create);
routes.get("/", isAdmin, educationController.all);
routes.get("/:id", isAdmin, educationController.read);
routes.put("/:id", isAdmin, validators.education, educationController.update);
routes.delete("/:id", isAdmin, educationController.delete);
export default routes;
