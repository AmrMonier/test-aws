import BaseController from "./BaseController.js";
import User from "./../models/User.js";
import { generateJWT, verify, hash } from "./../helpers/cryptography.js";
import { generateOTP } from "./../helpers/otp.js";
import RewardRequest from "./../models/RewardRequest.js";
import { checkId } from "./../helpers/methods.js";
import { sendOTP } from "./../helpers/twilio.js";

class UserController extends BaseController {
  async register(req, res, next) {
    super.reportErrors(req, res, next).then(async () => {
      let { name, email, password, phoneNumber } = req.body;
      password = await hash(password);
      const otp = generateOTP(6);
      User.create({ name, email, password, phoneNumber, otp }).then(
        async (user) => {
          sendOTP(otp, user.phoneNumber).then(() => {
            return res
              .status(201)
              .json({ msg: "Check your inbox, an OTP have been sent", user });
          });
        }
      );
    });
  }

  async verify(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { id } = req.params;
      if (!checkId(id)) {
        return res.status(404).json({ msg: "requested resources not found" });
      }
      const { otp } = req.body;
      if (!checkId(id)) {
        return res.status(404).json({ msg: "requested resource not found" });
      }
      User.findById(id)
        .then((user) => {
          if (!user) {
            return res.status(401).json({ msg: "invalid OTP" });
          }
          if (user.otp.code !== otp || Date.now() > user.otp.expireation) {
            return res.status(401).json({ msg: "invalid OTP" });
          }

          user.isVerified = true;
          user.otp.code = null;
          user.otp.expireation = null;
          user.save();
          return res.json({
            msg: "your account has been verified successfully",
            user,
            token: generateJWT(user.toJSON()),
          });
        })
        .catch((err) => next(err));
    });
  }

  async login(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { email, password } = req.body;
      User.findOne({ email })
        .then(async (user) => {
          if (!user) {
            return res.status(401).json({ msg: "invalid credentials" });
          }
          const result = await verify(password, user.password);
          if (!result) {
            return res.status(401).json({ msg: "invalid credentials" });
          }
          return res.json({ user, token: generateJWT(user.toJSON()) });
        })
        .catch((err) => next(err));
    });
  }

  async resetPassword(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { phoneNumber } = req.body;
      User.findOne({ phoneNumber }).then(async (user) => {
        if (!user) {
          return res
            .status(401)
            .json({ msg: "This phone number dosen't exist" });
        }
        user.otp.code = generateOTP(6);
        user.otp.expireation = Date.now() + 1 * 60 * 60 * 1000;
        user.save();
        sendOTP(user.otp.code, user.phoneNumber)
          .then(() =>
            res.json({
              msg: "check your inbox. an E-Mail have been sent to you",
              user: {
                id: user._id,
                name: user.name,
              },
            })
          )
          .catch((err) => next(err));
      });
    });
  }
  async updatePassword(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { id } = req.params;
      if (!checkId(id)) {
        return res.status(404).json({ msg: "requested resources not found" });
      }
      const { password, otp } = req.body;
      if (!checkId(id)) {
        return res.status(404).json({ msg: "requested resource not found" });
      }
      User.findById(id)
        .then(async (user) => {
          if (!user) {
            return res.status(401).json({ msg: "invalid OTP" });
          }
          if (user.otp.code !== otp || Date.now() > user.otp.expireation) {
            return res.status(401).json({ msg: "invalid OTP" });
          }
          user.password = await hash(password);
          user.otp.code = null;
          user.otp.expireation = null;
          user.save();
          return res.json({ msg: "password reseted successfully" });
        })
        .catch((err) => next(err));
    });
  }

  async update(req, res, next) {
    super
      .reportErrors(req, res, next)
      .then(() => {
        const id = req.user._id;
        if (!checkId(id)) {
          return res.status(404).json({ msg: "requested resources not found" });
        }

        if (id.length !== 24) {
          return res.status(404).json({ msg: "resource not found" });
        }
        const { name, phoneNumber } = req.body;
        User.findByIdAndUpdate(id, { name, phoneNumber }, { new: true }).then(
          (user) => {
            if (!user) {
              return res.status(404).json({ msg: "resource not found" });
            }
            return res.json({ msg: "record updated successfully", user });
          }
        );
      })
      .catch((err) => next(err));
  }
  async changePassword(req, res, next) {
    super.reportErrors(req, res, next).then(async () => {
      const user = req.user;
      const { password } = req.body;
      user.password = await hash(password);
      user.save();
      return res.json({ msg: "password updated successfully" });
    });
  }
  async rewardRequests(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const status = req.query.status || "pending";
      RewardRequest.find({ user: req.user._id, status })
        .populate([{ path: "reward", populate: "provider" }])
        .then((requests) => res.json({ requests }))
        .catch((err) => next(err));
    });
  }
  async deleteRewardRequest(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resource not found" });
    }
    RewardRequest.findOne({ _id: id, user: req.user._id })
      .then((request) => {
        if (!request) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        if (request.status === "approved") {
          return res
            .status(400)
            .json({ msg: "can't cancel a request after being approved" });
        }
        request.remove().then(() => {
          return res.status(204).json();
        });
      })
      .catch((err) => next(err));
  }

  async me(req, res, next) {
    return res.json({ user: req.user });
  }
  async all(req, res, next) {
    User.find().then((users) => res.json(users));
  }
  async read(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resources not found" });
    }
    User.findById(id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        return res.json({ user });
      })
      .catch((err) => next(err));
  }
  async restrict(req, res, next) {
    super
      .reportErrors(req, res, next)
      .then(() => {
        const { id } = req.params;
        if (!checkId(id)) {
          return res.status(404).json({ msg: "requested resources not found" });
        }

        User.findById(id).then((user) => {
          if (!user) {
            return res.status(404).json({ msg: "resource not found" });
          }
          user.isRestricted = !user.isRestricted;
          user.save();
          return res.json({ msg: "record updated successfully", user });
        });
      })
      .catch((err) => next(err));
  }

  async ResendOtp(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resources not found" });
    }
    User.findById(id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ msg: "resource not found" });
        }
        user.otp.code = generateOTP(6);
        user.otp.expireation = Date.now() + 1 * 60 * 60 * 1000;
        user.save();
        sendOTP(user.otp.code, user.phoneNumber).then(() => {
          return res.json({
            msg: "new OTP code has been sent to you",
            user: { id: user._id, name: user.name },
          });
        });
      })
      .catch((err) => next(err));
  }
}

export default new UserController();
