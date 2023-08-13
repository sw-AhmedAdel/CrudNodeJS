import { Request, Response, NextFunction } from "express";
import { Model, Document, Query } from "mongoose";
import resUtil from "../utils/response.util";
import ApiError from "../utils/error.util";
import ServiceFactory from "../services/factory.service";
import modelOptionsUtil from "../utils/get-model-options.util";
class ControllerFactory<T extends Document | any> {
  private successMsg = "data fetched successfully";
  private noDataMsg = "data doesn't exist";
  serviceFactory: ServiceFactory<T>;
  constructor(private Model: Model<T>) {
    this.serviceFactory = new ServiceFactory(this.Model);
  }
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.serviceFactory.create(req.body);
      resUtil(req, res, "OK", "created", { data });
      res.status(200).json({ message: "saved" });
    } catch (err) {
      next(new ApiError(err.message, err.statusCode));
    }
  };
  getAll =
    (projection = "") =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await this.serviceFactory.findAllBagAndSort({
          query: req.query,
          projection,
        });
        resUtil(req, res, "OK", this.successMsg, { ...result });
      } catch (err) {
        next(new ApiError(err));
      }
    };
  getById =
    (paramName: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await this.serviceFactory.getById(req.params[paramName]);
        if (!data) resUtil(req, res, "NOT_FOUND", this.noDataMsg);
        resUtil(req, res, "OK", this.successMsg, { data });
      } catch (err) {
        next(new ApiError(err.message));
      }
    };
  updateById =
    (paramName: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await this.serviceFactory.updateById(
          req.params[paramName],
          req.body
        );
        if (!data) resUtil(req, res, "NOT_FOUND", this.noDataMsg);
        resUtil(req, res, "OK", "data updated successfully", {
          data: req.body,
        });
      } catch (err) {
        next(new ApiError(err.message));
      }
    };
  deleteById =
    (paramName: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await this.serviceFactory.deleteById(
          req.params[paramName]
        );
        if (!result) resUtil(req, res, "NOT_FOUND", this.noDataMsg);
        resUtil(req, res, "OK", "data deleted successfully");
      } catch (err) {
        next(new ApiError(err.message));
      }
    };
  getModelFields = () => {
    return modelOptionsUtil(this.Model);
  };
  getOptions = (req: Request, res: Response, next: NextFunction) => {
    const attributes = this.getModelFields();
    resUtil(req, res, "OK", "entity options", { attributes });
  };
  getFormTemplate = (req: Request, res: Response, next: NextFunction) => {
    const fields = req.query.fields as string[];
    const attributes = fields
      ? this.getModelFields().filter((field) => {
          return fields.includes(field.name);
        })
      : this.getModelFields();
    resUtil(req, res, "OK", "entity template form", { fields: attributes });
  };

  search =
    (projection = "", exceptions = []) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let modelPaths = this.Model.schema.paths;
        let criteria = {};
        for (let k in req.body) {
          if (modelPaths.hasOwnProperty(k)) {
            criteria[k] = new RegExp(req.body[k], "i");
            if (exceptions.includes(k)) criteria[k] = req.body[k];
          }
        }
        const result = await this.serviceFactory.findAllBagAndSort({
          query: req.query,
          projection,
          criteria,
        });
        resUtil(req, res, "OK", "search result", { ...result });
      } catch (err) {
        next(new ApiError(err.message, err.status));
      }
    };
}

export default ControllerFactory;
