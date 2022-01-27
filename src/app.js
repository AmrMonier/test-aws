import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import dbInstance from "./middlewares/mongoose.js";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import adminAuthRoutes from "./routes/admin.js";
import clientAuthRoutes from "./routes/client.js";

import rewardProviderRoutes from "./routes/rewardProvider.js";
import rewardsRoutes from "./routes/reward.js";
import userRoutes from "./routes/user.js";
import rewardRequestRoutes from "./routes/rewardRequest.js";
import loiRoutes from "./routes/lengthOfInterview.js";
import panelServicesRoutes from "./routes/panelService.js";
import AMHIRoutes from "./routes/amhi.js";
import categoryRoutes from "./routes/category.js";
import educationRoutes from "./routes/education.js";
import regionRoutes from "./routes/region.js";
import incidenceRateRoutes from "./routes/incidenceRate.js";
import sampleSizeRoutes from "./routes/smapleSize.js";

import rateCardRoutes from "./routes/rateCard.js";
import sampleSizeRateCard from "./routes/sampleSizeRateCard.js";
import countryRoutes from "./routes/country.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
class App {
  constructor() {
    config();
    fs.readFile("./src/keys/jwtRS256.key", (err, key) => {
      process.env.privateKey = key.toString();
    });
    fs.readFile("./src/keys/jwtRS256.key.pub", (err, key) => {
      process.env.publicKey = key.toString();
    });
    this.server = express();
    dbInstance
      .connect()
      .then((err) => {
        console.log("Database connected");
      })
      .catch((err) => {
        console.error("failed to connect to database");
        console.log(err);
      });
    this.middlewares();
    this.routes();
    this.GlobalErrorHandling();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(bodyParser.json());
    this.server.use(
      "/public",
      express.static(path.join(__dirname, "../", "public"))
    );
  }

  GlobalErrorHandling() {
    // the middleware responsible of handling 400 Bad Request
    this.server.use((req, res, next) => {
      if (req.errors) {
        console.log(req.errors);
        return res.status(400).json({ errors: req.errors });
      }
      next();
    });

    // the middleware responsible of handling 500 Internal Server Error
    this.server.use((err, req, res, next) => {
      console.log(err);
      res.setHeader("Content-Type", "application/json");
      res.status(500);
      res.send(JSON.stringify({ msg: "Oop! Something went wrong" }));
    });

    // the middleware responsible of handling 404 Resource Not Found
    this.server.use((req, res, next) => {
      res.status(404).json({ msg: "requested resource not found" });
    });
    // no middle ware registeration to the app beyond this line
  }

  routes() {
    this.server.use("/api/admins", adminAuthRoutes);
    this.server.use("/api/clients", clientAuthRoutes);
    this.server.use("/api/rewarads-providers", rewardProviderRoutes);
    this.server.use("/api/rewarads", rewardsRoutes);
    this.server.use("/api/users", userRoutes);
    this.server.use("/api/reward-requests", rewardRequestRoutes);
    this.server.use("/api/length-of-interview", loiRoutes);
    this.server.use("/api/panel-services", panelServicesRoutes);
    this.server.use("/api/amhis", AMHIRoutes);
    this.server.use("/api/categories", categoryRoutes);
    this.server.use("/api/education", educationRoutes);
    this.server.use("/api/regions", regionRoutes);
    this.server.use("/api/incidence-rates", incidenceRateRoutes);
    this.server.use("/api/sample-sizes", sampleSizeRoutes);
    this.server.use("/api/rate-cards", rateCardRoutes);
    this.server.use("/api/sample-size-rate-cards", sampleSizeRateCard);
    this.server.use("/api/countries", countryRoutes);
  }
}

export default new App().server;
