import BaseController from "./BaseController.js";
import Category from "./../models/Category.js";
import { checkId } from "./../helpers/methods.js";
class CategoryController extends BaseController {
  async create(req, res, next) {
    super.reportErrors(req, res, next).then(() => {
      const { name } = req.body;
      Category.create({ name }).then((category) => {
        return res.status(201).json({
          msg: "a record has been created",
          category,
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
      Category.findByIdAndUpdate(id, { name }, { new: true })
        .then((category) => {
          if (!category) {
            return res
              .status(404)
              .json({ msg: "requested resource not found" });
          }
          return res
            .status(200)
            .json({ msg: "record updated successfully", category });
        })
        .catch((err) => next(err));
    });
  }

  async all(req, res, next) {
    return Category.find({}).then((data) => res.json({ data }));
  }

  async delete(req, res, next) {
    const { id } = req.params;
    if (!checkId(id)) {
      return res.status(404).json({ msg: "requested resources not found" });
    }
    Category.findByIdAndDelete(id)
      .then((category) => {
        if (!category) {
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
    Category.findById(id)
      .then((category) => {
        if (!category) {
          return res.status(404).json({ msg: "requested resource not found" });
        }
        return res.json({ category });
      })
      .catch((err) => next(err));
  }
}

export default new CategoryController();
