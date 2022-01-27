import { check } from "express-validator";
import LOI from "./../models/LengthOfInterview.js";
import IncidenceRate from "./../models/IncidenceRate.js";
import RateCard from "./../models/RateCard.js";
import Country from "./../models/Country.js";
import SampleSize from "./../models/SampleSize.js";
import SampleSizeRateCard from "./../models/SampleSizeRateCard.js";

const validators = {
  lengthOfInterview: [
    check("value")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Invalid length of interview"),
  ],
  panelService: [
    check("name")
      .trim()
      .matches(
        /^(?:[a-zA-Z0-9\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){0,30}$/
      )
      .withMessage("Name can contain only Arabic or English letters")
      .isLength({ min: 3 })
      .withMessage("name must be at least 3 characters long"),
  ],
  amhi: [
    check("average", "average must be a valid number")
      .isNumeric({ min: 1 })
      .custom(async (value) => {
        if (value <= 0) {
          return Promise.reject();
        }
      }),
  ],
  category: [
    check("name")
      .trim()
      .matches(
        /^(?:[a-zA-Z0-9\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){0,30}$/
      )
      .withMessage("Name can contain only Arabic or English letters")
      .isLength({ min: 3 })
      .withMessage("name must be at least 3 characters long"),
  ],
  education: [
    check("level")
      .trim()
      .matches(
        /^(?:[a-zA-Z0-9\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){0,30}$/
      )
      .withMessage("level can contain only Arabic or English letters")
      .isLength({ min: 3 })
      .withMessage("level must be at least 3 characters long"),
  ],
  region: [
    check("name")
      .trim()
      .matches(
        /^(?:[a-zA-Z0-9\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){0,30}$/
      )
      .withMessage("Name can contain only Arabic or English letters")
      .isLength({ min: 3 })
      .withMessage("name must be at least 3 characters long"),
    check("country")
      .custom(async (value) => {
        return Country.findById(value)
          .then((country) => {
            if (!country) {
              return Promise.reject();
            }
          })
          .catch((err) => {
            return Promise.reject();
          });
      })
      .withMessage("this country doesn't exist"),
  ],
  incidenceRate: [
    check("rate").isLength(2).withMessage("invalid incidence rate"),
  ],
  sampleSize: [
    check("from", "rate must be a valid number")
      .isNumeric({ min: 1 })
      .custom(async (value) => {
        if (value <= 0) {
          return Promise.reject();
        }
      }),
    check("to", "to must be a valid number")
      .isNumeric({ min: 1 })
      .custom(async (value, { req }) => {
        const { from } = req.body;
        if (value <= 0 || value < from) {
          return Promise.reject();
        }
      }),
  ],
  rateCard: [
    check("number")
      .isInt({ min: 1 })
      .withMessage("rate card number can't be less than 1"),
    check("value").isNumeric().withMessage("value must be a number"),
    check("loi")
      .custom(async (value) => {
        return LOI.findById(value).then((loi) => {
          if (!loi) {
            return Promise.reject();
          }
        });
      })
      .withMessage("this length of interview doesn't exist"),
    check("incidenceRate")
      .custom(async (value) => {
        return IncidenceRate.findById(value).then((rate) => {
          if (!rate) {
            return Promise.reject();
          }
        });
      })
      .withMessage("this Incident rate doesn't exist")
      .custom(async (value, { req }) => {
        const { loi, number } = req.body;
        return RateCard.findOne({ loi, incidenceRate: value, number }).then(
          (rateCard) => {
            if (rateCard && req.method == "POST") {
              return Promise.reject();
            }
          }
        );
      })
      .withMessage("this rate card already exist")
      .custom(async (value, { req }) => {
        const { loi, number } = req.body;
        return RateCard.findOne({ loi, incidenceRate: value, number }).then(
          (rateCard) => {
            if (!rateCard && req.method == "PUT") {
              return Promise.reject();
            }
          }
        );
      })
      .withMessage("this rate card doesn't exist"),

    check("duration").trim().isLength(3).withMessage("invalid duration"),
  ],
  country: [
    check("name")
      .trim()
      .matches(
        /^(?:[a-zA-Z0-9\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){0,30}$/
      )
      .withMessage("Name can contain only Arabic or English letters")
      .isLength({ min: 3 })
      .withMessage("name must be at least 3 characters long"),
    check("rateCard")
      .isInt({ min: 1 })
      .withMessage("rate card number can't be less than 1"),
  ],
  sampleSizeRateCard: [
    check("number")
      .isInt({ min: 1 })
      .withMessage("rate card number can't be less than 1"),
    check("duration")
      .isInt({ min: 1 })
      .withMessage("duration must be a number greater than 0"),
    check("sampleSize")
      .isLength(24)
      .withMessage("this sample size doesn't exist")
      .custom(async (value) => {
        return SampleSize.findById(value).then((sampleSize) => {
          if (!sampleSize) {
            return Promise.reject();
          }
        });
      })
      .withMessage("this sample size doesn't exist"),
    check("incidenceRate")
      .custom(async (value) => {
        return IncidenceRate.findById(value).then((rate) => {
          if (!rate) {
            return Promise.reject();
          }
        });
      })
      .withMessage("this Incident rate doesn't exist")
      .custom(async (value, { req }) => {
        const { sampleSize, number } = req.body;
        return SampleSizeRateCard.findOne({
          sampleSize,
          incidenceRate: value,
          number,
        }).then((rateCard) => {
          if (rateCard && req.method == "POST") {
            return Promise.reject();
          }
        });
      })
      .withMessage("this rate card already exist")
      .custom(async (value, { req }) => {
        const { sampleSize, number } = req.body;
        return SampleSizeRateCard.findOne({
          sampleSize,
          incidenceRate: value,
          number,
        }).then((rateCard) => {
          if (!rateCard && req.method == "PUT") {
            return Promise.reject();
          }
        });
      })
      .withMessage("this rate card doesn't exist"),
  ],
};

export default validators;
