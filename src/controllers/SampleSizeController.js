import BaseController from "./BaseController.js";
import SampleSize from "./../models/SampleSize.js";
import { checkId } from "./../helpers/methods.js";

class SampleSizeController extends BaseController {
  async create(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { from, to } = req.body;
      SampleSize.create({ from, to }).then((sampleSize) => {
        return res.status(201).json({
          msg: "a record has been created",
          sampleSize,
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
      const { from, to } = req.body;
      SampleSize.findByIdAndUpdate(id, { from, to }, { new: true })
        .then((sampleSize) => {
          if (!sampleSize) {
            return res
              .status(404)
              .json({ msg: "requested resource not found" });
          }
          return res
            .status(200)
            .json({ msg: "record updated successfully", sampleSize });
        })
        .catch((err) => next(err));
    });
  }

  async all(req, res, next) {
    return SampleSize.find({}).then((data) => res.json({ data }));
  }

  async delete(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resources not found" });
    }
    SampleSize.findByIdAndDelete(id)
      .then((sampleSize) => {
        if (!sampleSize) {
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
    SampleSize.findById(id)
      .then((sampleSize) => {
        if (!sampleSize) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        return res.json({ sampleSize });
      })
      .catch((err) => next(err));
  }
}

export default new SampleSizeController();
