import BaseController from "./BaseController.js";
import IncidenceRate from "../models/IncidenceRate.js";
import RateCard from "../models/RateCard.js";
import { checkId } from "../helpers/methods.js";

class IncidenceRateController extends BaseController {
  async create(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { rate } = req.body;
      IncidenceRate.create({ rate }).then((incidenceRate) => {
        return res.status(201).json({
          msg: "a record has been created",
          incidenceRate,
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
      const { rate } = req.body;
      IncidenceRate.findByIdAndUpdate(id, { rate }, { new: true })
        .then((incidenceRate) => {
          if (!incidenceRate) {
            return res
              .status(404)
              .json({ msg: "requested resource not found" });
          }
          return res
            .status(200)
            .json({ msg: "record updated successfully", incidenceRate });
        })
        .catch((err) => next(err));
    });
  }

  async all(req, res, next) {
    return IncidenceRate.find({}).then((data) => res.json({ data }));
  }

  async delete(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resources not found" });
    }
    IncidenceRate.findById(id)
      .then((incidenceRate) => {
        if (!incidenceRate) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        RateCard.find({ incidenceRate })
          .count()
          .then((count) => {
            if (count !== 0) {
              return res.status(403).json({
                msg: "can't be deleted since it has rate cards attached to it",
              });
            }
            incidenceRate.remove().then(() => {
              return res.status(204).json();
            });
          });
      })
      .catch((err) => next(err));
  }

  async read(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resources not found" });
    }
    IncidenceRate.findById(id)
      .then((incidenceRate) => {
        if (!incidenceRate) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        return res.json({ incidenceRate });
      })
      .catch((err) => next(err));
  }
}

export default new IncidenceRateController();
