import BaseController from "./BaseController.js";
import RewardRequest from "./../models/RewardRequest.js";
import { checkId } from "./../helpers/methods.js";

class RewardRequestController extends BaseController {
  async all(req, res, next) {
    const status = req.query.status || "pending";
    RewardRequest.find({ status })
      .populate([{ path: "reward", populate: "provider" }, "user"])
      .then((data) => {
        return res.json(data);
      });
  }
  async read(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resource not found" });
    }
    RewardRequest.findById(id)
      .populate([{ path: "reward", populate: "provider" }, "user"])
      .then((request) => {
        if (!request) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        return res.json({ request });
      });
  }
  async approve(req, res, next) {
    const { id } = req.params;
    const { promoCode } = req.body;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resource not found" });
    }
    RewardRequest.findOne({ _id: id, status: "pending" })
      .populate({ path: "user" })
      .populate({ path: "reward" })
      .then((request) => {
        if (!request) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        const { user, reward } = request;
        if (user.points < reward.points) {
          request.status = "rejected";
          request.save().then(() => {
            return res
              .status(400)
              .json({ msg: "request rejected.user does not enough point" });
          });
        }
        request.status = "approved";
        request.promoCode = promoCode;
        user.points -= reward.points;
        user.save();
        request.save().then(() => {
          return res.json({ msg: "request approved successfully.", request });
        });
      })
      .catch((err) => next(err));
  }

  async reject(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resource not found" });
    }

    RewardRequest.findOneAndUpdate(
      { _id: id, status: "pending" },

      { status: "rejected" },
      { new: true }
    ).then((request) => {
      if (!request) {
        return res.status(404).json({ msg: "requested resource not found" });
      }
      return res.json({ msg: "request rejected successfully", request });
    });
  }
}

export default new RewardRequestController();
