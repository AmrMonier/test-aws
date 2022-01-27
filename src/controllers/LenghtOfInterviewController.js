import BaseController from "./BaseController.js";
import LOI from "./../models/LengthOfInterview.js";
import RateCard from "./../models/RateCard.js";
import { checkId } from "./../helpers/methods.js";

class LenghtOfInterviewController extends BaseController {
  async create(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { value } = req.body;
      LOI.create({ value }).then((loi) => {
        return res
          .status(201)
          .json({ msg: "length of interview record have been created", loi });
      });
    });
  }

  async update(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { id } = req.params;
      if (!checkId(id)) {
        return res.status(404).json({ msg: "requested resources not found" });
      }
      const { value } = req.body;
      LOI.findByIdAndUpdate(id, { value }, { new: true })
        .then((loi) => {
          if (!loi) {
            return res
              .status(404)
              .json({ msg: "requested resource not found" });
          }
          return res
            .status(200)
            .json({ msg: "record updated successfully", loi });
        })
        .catch((err) => next(err));
    });
  }

  async all(req, res, next) {
    return LOI.find({}).then((data) => res.json({ data }));
  }

  async delete(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resources not found" });
    }

    LOI.findById(id)
      .then((loi) => {
        if (!loi) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        RateCard.find({ loi })
          .count()
          .then((count) => {
            if (count !== 0) {
              return res.status(403).json({
                msg: "can't be deleted since it has rate cards attached to it",
              });
            }
            loi.remove().then(() => {
              return res.status(204).json();
            });
          });
      })
      .catch((err) => {
        return res.status(404).json({ msg: "requested resource not found" });
      });
  }

  async read(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resources not found" });
    }
    LOI.findById(id)
      .then((loi) => {
        if (!loi) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        return res.json({ loi });
      })
      .catch((err) => {
        return res.status(404).json({ msg: "requested resource not found" });
      });
  }
}

export default new LenghtOfInterviewController();
