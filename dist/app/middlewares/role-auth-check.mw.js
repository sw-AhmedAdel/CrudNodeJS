"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAccessRole = void 0;
const asset_model_1 = __importDefault(require("../models/asset.model"));
const verfy_user_util_1 = require("../utils/verfy-user.util");
const response_util_1 = __importDefault(require("../utils/response.util"));
function getCriteria(req) {
    let url = req.baseUrl + (req.path == "/" ? "" : req.path); // rm '/' if exist
    url = url.split("v1/")[1]; // get url after 'v1' keyword
    // rm value of params if it's exist
    for (let k in req.params) {
        url = url.replace(`/${req.params[k]}`, "");
    }
    const reqParams = Object.keys(req.params);
    const criteria = reqParams.length > 0 ? { url, params: reqParams } : { url };
    return criteria;
}
async function checkAccessRole(req, res, next) {
    try {
        // decode token then extract it's values
        const { role, id } = (await (0, verfy_user_util_1.verifyUser)(req));
        req.user = {
            role,
            id,
            auth: false,
        };
        const criteria = getCriteria(req);
        const pipeline = [
            {
                $match: criteria
            },
            {
                $graphLookup: {
                    from: 'assets',
                    startWith: '$_id',
                    connectFromField: 'parent',
                    connectToField: '_id',
                    as: 'assetsParent',
                },
            },
        ];
        let assets = await asset_model_1.default.aggregate(pipeline);
        if (assets[0].assetsParent.length < 1)
            return (0, response_util_1.default)(req, res, "NOT_FOUND", "No data");
        for (let i = 0; i < assets[0].assetsParent.length; i++) {
            if (assets[0].assetsParent[i].roles.includes(req.user.role)) {
                req.user.auth = true;
                return next();
            }
        }
        return (0, response_util_1.default)(req, res, "UN_AUTH", "Resource is not allowed");
    }
    catch (error) {
        return (0, response_util_1.default)(req, res, "INTERNAL_SER_ERR", error.message);
    }
}
exports.checkAccessRole = checkAccessRole;
;
//# sourceMappingURL=role-auth-check.mw.js.map