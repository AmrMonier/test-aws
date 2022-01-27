import BaseController from "./BaseController.js";
import Country from "../models/Country.js";
import Region from "../models/Region.js";
import { checkId } from "../helpers/methods.js";

class CountryController extends BaseController {
  async create(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { name, rateCard } = req.body;
      Country.create({ name, rateCard }).then((country) => {
        return res.status(201).json({
          msg: "a record has been created",
          country,
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
      const { name, rateCard } = req.body;
      Country.findByIdAndUpdate(id, { name, rateCard }, { new: true })
        .then((country) => {
          if (!country) {
            return res
              .status(404)
              .json({ msg: "requested resource not found" });
          }
          return res.json({ msg: "record updated successfully", country });
        })
        .catch((err) => next(err));
    });
  }

  async all(req, res, next) {
    return Country.find({}).then((data) => res.json({ data }));
  }

  async delete(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resources not found" });
    }
    Country.findById(id)
      .then((country) => {
        if (!country) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        Region.find({ country })
          .count()
          .then((count) => {
            if (count !== 0) {
              return res.status(403).json({
                msg: "this country can't be deleted. since it got regions linked to it",
              });
            }
            return country.remove().then(() => res.status(204).json());
          });
      })
      .catch((err) => next(err));
  }

  async read(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resources not found" });
    }
    Country.findById(id)
      .then((country) => {
        if (!country) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        return res.json({ country });
      })
      .catch((err) => next(err));
  }
  async regions(req, res, next) {
    const { id } = req.params;
    Country.findById(id)
      .then((country) => {
        if (!country) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        Region.find({ country: id }).then((regions) => {
          return res.json({ regions });
        });
      })
      .catch((err) => next(err));
  }
}

export default new CountryController();
