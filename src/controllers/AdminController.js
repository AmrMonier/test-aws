import BaseController from "./BaseController.js";
import Admin from "././../models/Admin.js";
import Token from "./../models/Token.js";
import {
  verify,
  generateJWT,
  genVerificationToken,
  hash,
} from "./../helpers/cryptography.js";
import {
  sendResetPasswordMail,
  confirmPasswordResetedMail,
} from "./../helpers/sendGrid.js";
class AdminController extends BaseController {
  async login(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { email, password } = req.body;
      Admin.findOne({ email })
        .then(async (admin) => {
          if (!admin) {
            return res.status(401).json({ msg: "invalid credentials" });
          }
          const result = await verify(password, admin.password);
          if (!result) {
            return res.status(401).json({ msg: "invalid credentials" });
          }
          return res.json({ admin, token: generateJWT(admin.toJSON()) });
        })
        .catch((err) => next(err));
    });
  }
  async createAccount(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { name, email } = req.body;
      Admin.create({ name, email }).then((admin) => {
        return res.status(201).json({ admin });
      });
    });
  }

  async resetPassword(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { email } = req.body;
      Admin.findOne({ email }).then(async (admin) => {
        if (!admin) {
          return res.status(401).json({ msg: "This email dosen't exist" });
        }
        const token = await genVerificationToken();
        Token.create({ token, owner: admin._id, type: "reset" }).then(
          (token) => {
            sendResetPasswordMail(admin, token.token)
              .then(() =>
                res.json({
                  msg: "check your inbox. an E-Mail have been sent to you",
                })
              )
              .catch((err) => next(err));
          }
        );
      });
    });
  }
  async updatePassword(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { password, token } = req.body;
      Token.findOne({ token, type: "reset" })
        .then((token) => {
          if (!token) {
            return res.status(401).json({ msg: "Invalid token" });
          }
          if (token.expiration < Date.now()) {
            return res.status(401).json({ msg: "This token is expired." });
          }
          Admin.findById(token.owner).then(async (admin) => {
            if (!admin) {
              return res.status(401).json({ msg: "Invalid token" });
            }
            admin.password = await hash(password);
            admin.save();
            token.remove();
            confirmPasswordResetedMail(admin).then(() => {
              return res.json({ msg: "password reseted successfully" });
            });
          });
        })
        .catch((err) => next(err));
    });
  }
  async me(req, res, next) {
    return res.json({ admin: req.user });
  }
  async update(req, res, next) {
    super
      .reportErrors(req, res, next)
      .then(() => {
        const id = req.user._id;
        const { name } = req.body;
        Admin.findByIdAndUpdate(id, { name }, { new: true }).then((admin) => {
          if (!admin) {
            return res.status(404).json({ msg: "resource not found" });
          }
          return res.json({ msg: "record updated successfully", admin });
        });
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
}

export default new AdminController();
