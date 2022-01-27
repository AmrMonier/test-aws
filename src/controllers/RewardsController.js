import BaseController from "./BaseController.js";
import Reward from "../models/Reward.js";
import fs from "fs";

import RewardRequest from "../models/RewardRequest.js";
import { checkId } from "../helpers/methods.js";

class RewardsController extends BaseController {
  async all(req, res, next) {
    Reward.find({})
      .populate("provider")
      .then((rewards) => res.json(rewards));
  }

  async create(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      if (!req.file) {
        req.errors = { photo: { value: null, msg: "photo must be provided" } };
        return next(null);
      }
      const { name, points, provider } = req.body;
      Reward.create({ name, points, provider }).then((reward) => {
        const extention = req.file.originalname.split(".").at(-1);
        const fileName = reward._id;
        const photo = `/photos/rewards/${fileName}.${extention}`;
        fs.writeFile("./public" + photo, req.file.buffer, (err) => {
          if (err) {
            return next(err);
          }
          reward.photo = photo;
          reward.save();
          return res
            .status(201)
            .json({ msg: "reward created successfully", reward });
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
      const { name, points, provider } = req.body;
      Reward.findByIdAndUpdate(
        id,
        { name, points, provider },
        { new: true }
      ).then(async (reward) => {
        if (!reward) {
          return res.status(404).json({ msg: "requested resources not found" });
        }
        await reward.populate("provider");
        if (req.file) {
          const extention = req.file.originalname.split(".").at(-1);
          const fileName = reward._id;
          const photo = `/photos/rewards/${fileName}.${extention}`;
          fs.writeFileSync("./public" + photo, req.file.buffer);
          reward.photo = photo;
          reward.save();
        }
        return res.json({ msg: "updated successfully", reward });
      });
    });
  }

  async read(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resources not found" });
    }
    Reward.findById(id)
      .populate("provider")
      .then((reward) => {
        if (!reward) {
          return res.status(404).json({ msg: "requested resource not found" });
        }

        return res.json({ reward });
      })
      .catch((err) => next(err));
  }

  async delete(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resources not found" });
    }

    Reward.findById(id)
      .then((reward) => {
        if (!reward) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        RewardRequest.find({ reward })
          .count()
          .then((count) => {
            if (count !== 0) {
              return res.status(403).json({
                msg: "can't be deleted. it has requests attached to it",
              });
            }
            if (fs.existsSync("./public" + reward.photo)) {
              fs.unlinkSync("./public" + reward.photo);
            }
            reward.remove().then(() => {
              return res.status(204).json();
            });
          });
      })
      .catch((err) => next(err));
  }

  async request(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resources not found" });
    }
    const user = req.user;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resource not found" });
    }
    Reward.findById(id).then((reward) => {
      if (!reward)
        return res.status(404).json({ msg: "requested resource not found" });
      if (user.points < reward.points) {
        return res.status(400).json({ msg: "not enough points" });
      }
      RewardRequest.create({ user: user._id, reward: reward._id }).then(
        (rewardRequest) => {
          return res.status(201).json({ msg: "request is submitted" });
        }
      );
    });
  }
}

export default new RewardsController();
