"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asset_model_1 = __importDefault(require("../models/asset.model"));
const verfy_user_util_1 = require("../utils/verfy-user.util");
const response_util_1 = __importDefault(require("../utils/response.util"));
// populate the returned data by specific levels (number)
const generatePopulateOptions = (depth) => {
    if (depth <= 0) {
        return null;
    }
    return {
        path: "parent",
        populate: generatePopulateOptions(depth - 1),
    };
};
// get search criteria and levels count
const getLevelsAndCriteria = (req) => {
    let url = req.baseUrl + (req.path == "/" ? "" : req.path); // rm '/' if exist
    url = url.split("v1/")[1]; // get url after 'v1' keyword
    // rm value of params if it's exist
    for (let k in req.params) {
        url = url.replace(`/${req.params[k]}`, "");
    }
    const reqParams = Object.keys(req.params);
    const criteria = reqParams.length > 0 ? { url, params: reqParams } : { url };
    const levelsCount = url.split("/").length + reqParams.length;
    return { criteria, levelsCount };
};
exports.default = async (req, res, next) => {
    try {
        // decode token then extract it's values
        const { role, id } = (await (0, verfy_user_util_1.verifyUser)(req));
        req.user = {
            role,
            id,
            auth: false,
        };
        const { criteria, levelsCount } = getLevelsAndCriteria(req);
        let data = await asset_model_1.default
            .findOne(criteria)
            .populate(generatePopulateOptions(10));
        if (!data)
            return (0, response_util_1.default)(req, res, "NOT_FOUND", "No data");
        let pointer = data;
        //console.log(pointer)
        do {
            if (pointer.roles?.includes(req.user.role) &&
                (pointer.method === req.method.toLowerCase() || pointer.method === "*")) {
                req.user.auth = true;
                return next();
            }
            pointer = pointer.parent;
        } while (pointer);
        return (0, response_util_1.default)(req, res, "UN_AUTH", "Resource is not allowed");
    }
    catch (error) {
        return (0, response_util_1.default)(req, res, "INTERNAL_SER_ERR", error.message);
    }
};
//# sourceMappingURL=role-auth.mw.js.map