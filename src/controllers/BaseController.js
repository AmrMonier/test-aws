import { validationResult } from "express-validator";

class BaseController {
  reportErrors(req, res, next) {
    return new Promise((resolve, reject) => {
      
      const errors = validationResult(req);
      if (errors.isEmpty() && !req.errors) {
          return resolve();
        }
        if (!errors.isEmpty()) {
          req.errors = errors.mapped();
        }
        next(null);
        
    });
  }
}
export default BaseController;
