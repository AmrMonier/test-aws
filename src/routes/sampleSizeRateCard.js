import { Router } from "express";
import rateCardController from "../controllers/SampleSizeRateCardController.js";

import { isAdmin } from "../middlewares/authorization.js";
import validators from "../validators/projectDependencies.js";
const routes = new Router();

routes.post("/", isAdmin, validators.sampleSizeRateCard, rateCardController.create);
routes.get("/", isAdmin, rateCardController.all);
routes.get("/:number", isAdmin, rateCardController.getByNumber);
routes.get("/entry/:id", isAdmin, rateCardController.read);
routes.put("/:id", isAdmin, validators.sampleSizeRateCard, rateCardController.update);
routes.delete("/:id", isAdmin, rateCardController.delete);

export default routes;
