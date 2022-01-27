import { Router } from "express";
import sampleSizeController from "./../controllers/SampleSizeController.js";

import { isAdmin } from "./../middlewares/authorization.js";
import validators from "./../validators/projectDependencies.js";
const routes = new Router();

routes.post("/", isAdmin, validators.sampleSize, sampleSizeController.create);
routes.get("/", isAdmin, sampleSizeController.all);
routes.get("/:id", isAdmin, sampleSizeController.read);
routes.put("/:id", isAdmin, validators.sampleSize, sampleSizeController.update);
routes.delete("/:id", isAdmin, sampleSizeController.delete);
export default routes;
