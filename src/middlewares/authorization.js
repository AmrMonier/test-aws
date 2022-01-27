import { verifyJWT } from "../helpers/cryptography.js";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import { checkId } from "../helpers/methods.js";
import Client from "../models/Client.js";

const isAuthenticated = (req) => {
  let token = req.headers.authorization;
  if (!token) {
    return false;
  }
  token = token.split(" ")[1];
  try {
    const data = verifyJWT(token);
    if (!data) {
      return false;
    }
    return data;
  } catch (err) {
    return false;
  }
};

const isSuperAdmin = (req, res, next) => {
  const data = isAuthenticated(req);
  if (!data) {
    return res
      .status(401)
      .json({ msg: "unauthorized request, use a valid token" });
  }

  if (!checkId(data._id)) {
    return res
      .status(401)
      .json({ msg: "unauthorized access to the resources" });
  }
  Admin.findById(data._id)
    .then((admin) => {
      if (!admin.isSuperAdmin) {
        return res
          .status(401)
          .json({ msg: "unauthorized access to the resources" });
      }
      req.user = admin;
      next();
    })
    .catch((err) => next(err));
};
const isAdmin = (req, res, next) => {
  const data = isAuthenticated(req);
  if (!data) {
    return res
      .status(401)
      .json({ msg: "Un authorized request, use a valid token" });
  }

  if (!checkId(data._id)) {
    return res
      .status(401)
      .json({ msg: "unauthorized access to the resources" });
  }
  Admin.findById(data._id)
    .then((admin) => {
      if (!admin) {
        return res
          .status(401)
          .json({ msg: "unauthorized access to the resources" });
      }
      req.user = admin;
      next();
    })
    .catch((err) => next(err));
};
const isMobileApp = (req, res, next) => {
  let token = req.headers.access_token;
  if (!token) {
    return res.status(403).json({ msg: "Un authorized request" });
  }
  if (token !== process.env.MOBILE_KEY) {
    return res.status(403).json({ msg: "Un authorized request" });
  }

  next();
};

const isUser = (req, res, next) => {
  const data = isAuthenticated(req);
  if (!data) {
    return res
      .status(401)
      .json({ msg: "Un authorized request, use a valid token" });
  }

  if (!checkId(data._id)) {

    return res
      .status(401)
      .json({ msg: "unauthorized access to the resources" });
  }
  User.findById(data._id)
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ msg: "unauthorized access to the resources" });
      }
      req.user = user;
      next();
    })
    .catch((err) => next(err));
};
const isClient = (req, res, next) => {
  const data = isAuthenticated(req);
  if (!data) {
    return res
      .status(401)
      .json({ msg: "Un authorized request, use a valid token" });
  }
  if (data._id.length !== 24) {
    return res
      .status(401)
      .json({ msg: "unauthorized access to the resources" });
  }
  Client.findById(data._id)
    .then((client) => {
      if (!client) {
        return res
          .status(401)
          .json({ msg: "unauthorized access to the resources" });
      }
      req.user = client;
      next();
    })
    .catch((err) => next(err));
};
const isMobileOrAdmin = (req, res, next) => {
  const accessToken = req.headers.access_token;
  if (accessToken) {
    isMobileApp(req, res, next);
  } else {
    isAdmin(req, res, next);
  }
};
export {
  isSuperAdmin,
  isAdmin,
  isMobileApp,
  isUser,
  isMobileOrAdmin,
  isClient,
};
