import BaseController from "./BaseController.js";
import Token from "./../models/Token.js";
import Client from "./../models/Client.js";
import {
  genVerificationToken,
  generateJWT,
  verify,
  hash,
} from "./../helpers/cryptography.js";
import {
  sendVerificationMail,
  sendResetPasswordMail,
  confirmPasswordResetedMail,
} from "./../helpers/sendGrid.js";

class ClientController extends BaseController {
  async register(req, res, next) {
    super.reportErrors(req, res, next).then(async () => {
      let { name, email, password, phoneNumber } = req.body;
      password = await hash(password);
      Client.create({ name, email, password, phoneNumber }).then(
        async (client) => {
          const token = await genVerificationToken();
          Token.create({ token, owner: client._id, type: "verification" }).then(
            (token) => {
              sendVerificationMail(client, token.token).then(() => {
                return res
                  .status(201)
                  .json({ client, token: generateJWT(client.toJSON()) });
              });
            }
          );
        }
      );
    });
  }

  async verify(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { token } = req.params;
      Token.findOne({ token, type: "verification" }).then((token) => {
        if (!token) {
          return res.status(401).json({ msg: "invalid Token" });
        }
        Client.findById(token.owner).then((client) => {
          if (!client) {
            token.remove();
            return res.status(401).json({ msg: "invalid Token" });
          }
          client.isVerified = true;
          client.save();
          token.remove();
          return res.json({
            msg: "your account has been verified successfully",
          });
        });
      });
    });
  }

  async login(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { email, password } = req.body;
      Client.findOne({ email })
        .then(async (client) => {
          if (!client) {
            return res.status(401).json({ msg: "invalid credentials" });
          }
          const result = await verify(password, client.password);
          if (!result) {
            return res.status(401).json({ msg: "invalid credentials" });
          }
          return res.json({ client, token: generateJWT(client.toJSON()) });
        })
        .catch((err) => next(err));
    });
  }

  async resetPassword(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { email } = req.body;
      Client.findOne({ email }).then(async (client) => {
        if (!client) {
          return res.status(401).json({ msg: "This email dosen't exist" });
        }
        const token = await genVerificationToken();
        Token.create({ token, owner: client._id, type: "reset" }).then(
          (token) => {
            sendResetPasswordMail(client, token.token)
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
          Client.findById(token.owner).then(async (client) => {
            if (!client) {
              return res.status(401).json({ msg: "Invalid token" });
            }
            client.password = await hash(password);
            client.save();
            token.remove();
            confirmPasswordResetedMail(client).then(() => {
              return res.json({ msg: "password reseted successfully" });
            });
          });
        })
        .catch((err) => next(err));
    });
  }
  async create(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { name, email, phoneNumber } = req.body;
      Client.create({ name, email, phoneNumber }).then(async (client) => {
        const token = await genVerificationToken();
        Token.create({ token, owner: client._id, type: "verification" }).then(
          (token) => {
            sendVerificationMail(client, token.token).then(() => {
              return res.status(201).json({
                msg: "account created successfully",
                client: client.toJSON(),
              });
            });
          }
        );
      });
    });
  }

  async me(req, res, next) {
    return res.json({ client: req.user });
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

  async update(req, res, next) {
    super
      .reportErrors(req, res, next)
      .then(() => {
        const id = req.user._id;
        const { name, phoneNumber } = req.body;
        Client.findByIdAndUpdate(id, { name, phoneNumber }, { new: true }).then(
          (client) => {
            if (!client) {
              return res.status(404).json({ msg: "resource not found" });
            }
            return res.json({ msg: "record updated successfully", client });
          }
        );
      })
      .catch((err) => next(err));
  }
  async all(req, res, next) {
    return Client.find({}).then((clients) => res.json({ clients }));
  }
}

export default new ClientController();
