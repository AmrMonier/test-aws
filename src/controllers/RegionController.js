import BaseController from "./BaseController.js";
import Region from "../models/Region.js";
import { checkId } from "../helpers/methods.js";

class RegionController extends BaseController {
  async create(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { name, country } = req.body;
      Region.create({ name, country }).then((region) => {
        region.populate("country").then((region) => {
          return res.status(201).json({
            msg: "a record has been created",
            region,
          });
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
      const { name, country } = req.body;
      Region.findByIdAndUpdate(id, { name, country }, { new: true })
        .then((region) => {
          if (!region) {
            return res
              .status(404)
              .json({ msg: "requested resource not found" });
          }
          region.populate("country").then((region) => {
            return res.json({ msg: "record updated successfully", region });
          });
        })
        .catch((err) => next(err));
    });
  }

  async all(req, res, next) {
    return Region.find({})
      .populate("country")
      .then((data) => res.json({ data }));
  }

  async delete(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resources not found" });
    }
    Region.findByIdAndDelete(id)
      .then((region) => {
        if (!region) {
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
    Region.findById(id)
      .then((region) => {
        if (!region) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        return res.json({ region });
      })
      .catch((err) => next(err));
  }
}

export default new RegionController();
