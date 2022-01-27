import BaseController from "./BaseController.js";
import AMHI from "../models/AMHI.js";
import { checkId } from "../helpers/methods.js";

class AMHIController extends BaseController {
  async create(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { average } = req.body;
      AMHI.create({ average }).then((amhi) => {
        return res.status(201).json({
          msg: "length of interview record have been created",
          amhi,
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
      const { average } = req.body;
      AMHI.findByIdAndUpdate(id, { average }, { new: true })
        .then((amhi) => {
          if (!amhi) {
            return res
              .status(404)
              .json({ msg: "requested resource not found" });
          }
          return res
            .status(200)
            .json({ msg: "record updated successfully", amhi });
        })
        .catch((err) => next(err));
    });
  }

  async all(req, res, next) {
    return AMHI.find({}).then((data) => res.json({ data }));
  }

  async delete(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resources not found" });
    }
    AMHI.findByIdAndDelete(id)
      .then((amhi) => {
        if (!amhi) {
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
    AMHI.findById(id)
      .then((amhi) => {
        if (!amhi) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        return res.json({ amhi });
      })
      .catch((err) => next(err));
  }
}

export default new AMHIController();
