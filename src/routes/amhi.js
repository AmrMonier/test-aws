import { Router } from "express";

import { isAdmin } from "./../middlewares/authorization.js";
import validators from "./../validators/projectDependencies.js";
import AMHIController from "./../controllers/AMHIController.js";
const routes = new Router();

routes.post("/", isAdmin, validators.amhi, AMHIController.create);
routes.get("/", isAdmin, AMHIController.all);
routes.get("/:id", isAdmin, AMHIController.read);
routes.put("/:id", isAdmin, validators.amhi, AMHIController.update);
routes.delete("/:id", isAdmin, AMHIController.delete);
export default routes;
