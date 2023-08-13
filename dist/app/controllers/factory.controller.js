"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_util_1 = __importDefault(require("../utils/response.util"));
const error_util_1 = __importDefault(require("../utils/error.util"));
const factory_service_1 = __importDefault(require("../services/factory.service"));
const get_model_options_util_1 = __importDefault(require("../utils/get-model-options.util"));
class ControllerFactory {
    Model;
    successMsg = "data fetched successfully";
    noDataMsg = "data doesn't exist";
    serviceFactory;
    constructor(Model) {
        this.Model = Model;
        this.serviceFactory = new factory_service_1.default(this.Model);
    }
    create = async (req, res, next) => {
        try {
            const data = await this.serviceFactory.create(req.body);
            (0, response_util_1.default)(req, res, "OK", "created", { data });
            res.status(200).json({ message: "saved" });
        }
        catch (err) {
            next(new error_util_1.default(err.message, err.statusCode));
        }
    };
    getAll = (projection = "") => async (req, res, next) => {
        try {
            const result = await this.serviceFactory.findAllBagAndSort({
                query: req.query,
                projection,
            });
            (0, response_util_1.default)(req, res, "OK", this.successMsg, { ...result });
        }
        catch (err) {
            next(new error_util_1.default(err));
        }
    };
    getById = (paramName) => async (req, res, next) => {
        try {
            const data = await this.serviceFactory.getById(req.params[paramName]);
            if (!data)
                (0, response_util_1.default)(req, res, "NOT_FOUND", this.noDataMsg);
            (0, response_util_1.default)(req, res, "OK", this.successMsg, { data });
        }
        catch (err) {
            next(new error_util_1.default(err.message));
        }
    };
    updateById = (paramName) => async (req, res, next) => {
        try {
            const data = await this.serviceFactory.updateById(req.params[paramName], req.body);
            if (!data)
                (0, response_util_1.default)(req, res, "NOT_FOUND", this.noDataMsg);
            (0, response_util_1.default)(req, res, "OK", "data updated successfully", {
                data: req.body,
            });
        }
        catch (err) {
            next(new error_util_1.default(err.message));
        }
    };
    deleteById = (paramName) => async (req, res, next) => {
        try {
            const result = await this.serviceFactory.deleteById(req.params[paramName]);
            if (!result)
                (0, response_util_1.default)(req, res, "NOT_FOUND", this.noDataMsg);
            (0, response_util_1.default)(req, res, "OK", "data deleted successfully");
        }
        catch (err) {
            next(new error_util_1.default(err.message));
        }
    };
    getModelFields = () => {
        return (0, get_model_options_util_1.default)(this.Model);
    };
    getOptions = (req, res, next) => {
        const attributes = this.getModelFields();
        (0, response_util_1.default)(req, res, "OK", "entity options", { attributes });
    };
    getFormTemplate = (req, res, next) => {
        const fields = req.query.fields;
        const attributes = fields
            ? this.getModelFields().filter((field) => {
                return fields.includes(field.name);
            })
            : this.getModelFields();
        (0, response_util_1.default)(req, res, "OK", "entity template form", { fields: attributes });
    };
    search = (projection = "", exceptions = []) => async (req, res, next) => {
        try {
            let modelPaths = this.Model.schema.paths;
            let criteria = {};
            for (let k in req.body) {
                if (modelPaths.hasOwnProperty(k)) {
                    criteria[k] = new RegExp(req.body[k], "i");
                    if (exceptions.includes(k))
                        criteria[k] = req.body[k];
                }
            }
            const result = await this.serviceFactory.findAllBagAndSort({
                query: req.query,
                projection,
                criteria,
            });
            (0, response_util_1.default)(req, res, "OK", "search result", { ...result });
        }
        catch (err) {
            next(new error_util_1.default(err.message, err.status));
        }
    };
}
exports.default = ControllerFactory;
//# sourceMappingURL=factory.controller.js.map