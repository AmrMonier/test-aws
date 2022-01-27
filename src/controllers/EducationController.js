import BaseController from "./BaseController.js";
import Education from "./../models/Education.js";
import { checkId } from "./../helpers/methods.js";

class EducationController extends BaseController {
  async create(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { level } = req.body;
      Education.create({ level }).then((education) => {
        return res.status(201).json({
          msg: "a record has been created",
          education,
        });
      });
    });
  }

  async update(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { id } = req.params;
      if (!checkId(id)) {
        return res.status(404).json({ msg: "requested resources not found" });
      }
      const { level } = req.body;
      Education.findByIdAndUpdate(id, { level }, { new: true })
        .then((education) => {
          if (!education) {
            return res
              .status(404)
              .json({ msg: "requested resource not found" });
          }
          return res
            .status(200)
            .json({ msg: "record updated successfully", education });
        })
        .catch((err) => next(err));
    });
  }

  async all(req, res, next) {
    return Education.find({}).then((data) => res.json({ data }));
  }

  async delete(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resources not found" });
    }
    Education.findByIdAndDelete(id)
      .then((education) => {
        if (!education) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        return res.status(204).json();
      })
      .catch((err) => next(err));
  }

  async read(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resources not found" });
    }
    Education.findById(id)
      .then((education) => {
        if (!education) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        return res.json({ education });
      })
      .catch((err) => next(err));
  }
}

export default new EducationController();
