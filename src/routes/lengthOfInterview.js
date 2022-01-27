import { Router } from "express";

// import all controllers
// import SessionController from './app/controllers/SessionController';
import { isAdmin } from "./../middlewares/authorization.js";
import validators from "./../validators/projectDependencies.js";
import lenghtOfInterviewController from "./../controllers/LenghtOfInterviewController.js";
const routes = new Router();

routes.post(
  "/",
  isAdmin,
  validators.lengthOfInterview,
  lenghtOfInterviewController.create
);
routes.get("/", isAdmin, lenghtOfInterviewController.all);
routes.get("/:id", isAdmin, lenghtOfInterviewController.read);
routes.put(
  "/:id",
  isAdmin,
  validators.lengthOfInterview,
  lenghtOfInterviewController.update
);
routes.delete("/:id", isAdmin, lenghtOfInterviewController.delete);
export default routes;
