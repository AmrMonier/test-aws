import BaseController from "./BaseController.js";
import RewardProvider from "./../models/RewardProvider.js";
import { checkId } from "./../helpers/methods.js";
import Reward from "./../models/Reward.js";
class RewardProviderController extends BaseController {
  async all(req, res, next) {
    RewardProvider.find({}).then((providers) => res.json({ providers }));
  }

  async create(req, res, next) {
    super
      .reportErrors(req, res, next)
      .then(() => {
        const { name, email } = req.body;
        RewardProvider.create({ name, email }).then((provider) => {
          return res
            .status(201)
            .json({ msg: "reward provider created successfully", provider });
        });
      })
      .catch((err) => next(err));
  }
  async update(req, res, next) {
    super
      .reportErrors(req, res, next)
      .then(() => {
        const { id } = req.params;
        if (!checkId(id)) {
          return res.status(404).json({ msg: "requested resources not found" });
        }
        const { name, email } = req.body;
        RewardProvider.findByIdAndUpdate(
          id,
          { name, email },
          { new: true }
        ).then((provider) => {
          if (!provider) {
            return res
              .status(404)
              .json({ msg: "requested resources not found" });
          }
          return res.json({ msg: "updated successfully", provider });
        });
      })
      .catch((err) => next(err));
  }

  async read(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resources not found" });
    }
    RewardProvider.findById(id)
      .then((provider) => {
        if (!provider) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        return res.json({ provider });
      })
      .catch((err) => next(err));
  }

  async delete(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resources not found" });
    }

    RewardProvider.findById(id)
      .then((provider) => {
        if (!provider) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        Reward.find({ provider })
          .count()
          .then((count) => {
            if (count !== 0) {
              return res.status(403).json({
                msg: "can't be deleted. it has rewards attached to it",
              });
            }
            provider.remove().then(() => {
              return res.status(204).json();
            });
          });
      })
      .catch((err) => next(err));
  }
}

export default new RewardProviderController();
