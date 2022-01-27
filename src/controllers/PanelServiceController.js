import BaseController from "./BaseController.js";
import PanelService from "../models/PanelService.js";
import { checkId } from "../helpers/methods.js";

class PanelServiceController extends BaseController {
  async create(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { name } = req.body;
      PanelService.create({ name }).then((panelService) => {
        return res.status(201).json({
          msg: "length of interview record have been created",
          panelService,
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
      const { name } = req.body;
      PanelService.findByIdAndUpdate(id, { name }, { new: true })
        .then((panelService) => {
          if (!panelService) {
            return res
              .status(404)
              .json({ msg: "requested resource not found" });
          }
          return res
            .status(200)
            .json({ msg: "record updated successfully", panelService });
        })
        .catch((err) => next(err));
    });
  }

  async all(req, res, next) {
    return PanelService.find({}).then((data) => res.json({ data }));
  }

  async delete(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resources not found" });
    }
    PanelService.findByIdAndDelete(id)
      .then((panelService) => {
        if (!panelService) {
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
    PanelService.findById(id)
      .then((panelService) => {
        if (!panelService) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        return res.json({ panelService });
      })
      .catch((err) => next(err));
  }
}

export default new PanelServiceController();
