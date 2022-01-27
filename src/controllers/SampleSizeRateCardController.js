import BaseController from "./BaseController.js";
import RateCard from "../models/SampleSizeRateCard.js";
import { checkId } from "../helpers/methods.js";

class SampleSizeRateCardController extends BaseController {
  async create(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      
      const { number, duration, sampleSize, incidenceRate } = req.body;
      RateCard.create({ number, duration, sampleSize, incidenceRate }).then(
        (rateCard) => {
          rateCard
            .populate(["sampleSize", "incidenceRate"])
            .then((rateCard) => {
              return res.status(201).json({
                msg: "new record have been created",
                rateCard,
              });
            });
        }
      );
    });
  }

  async update(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { id } = req.params;
      if (!checkId(id)) {
        return res.status(404).json({ msg: "requested resources not found" });
      }
      const { number, duration, sampleSize, incidenceRate } = req.body;
      RateCard.findByIdAndUpdate(
        id,
        { number, duration, sampleSize, incidenceRate },
        { new: true }
      )
        .then((rateCard) => {
          if (!rateCard) {
            return res
              .status(404)
              .json({ msg: "requested resource not found" });
          }
          rateCard
            .populate(["sampleSize", "incidenceRate"])
            .then((rateCard) => {
              return res.json({
                msg: "record have been updated",
                rateCard,
              });
            });
        })
        .catch((err) => next(err));
    });
  }

  async all(req, res, next) {
    return RateCard.aggregate()
      .lookup({
        from: "samplesizes",
        localField: "sampleSize",
        foreignField: "_id",
        as: "sampleSize",
      })
      .unwind({ path: "$sampleSize" })
      .lookup({
        from: "incidencerates",
        localField: "incidenceRate",
        foreignField: "_id",
        as: "incidenceRate",
      })
      .unwind({ path: "$incidenceRate" })
      .group({ _id: "$number", records: { $push: "$$ROOT" } })
      .exec()
      .then((data) => res.json({ data }))
      .catch((err) => next(err));
  }

  async delete(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resources not found" });
    }
    RateCard.findByIdAndDelete(id)
      .then((rateCard) => {
        if (!rateCard) {
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
    RateCard.findById(id)
      .populate(["sampleSize", "incidenceRate"])
      .then((rateCard) => {
        if (!rateCard) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        return res.json({ rateCard });
      })
      .catch((err) => next(err));
  }
  async getByNumber(req, res, next) {
    const { number } = req.params;
    RateCard.find({ number })
      .populate(["sampleSize", "incidenceRate"])
      .then((data) => {
        if (data.length === 0) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        return res.json({ rateCard: data });
      })
      .catch((err) => next(err));
  }
}

export default new SampleSizeRateCardController();
