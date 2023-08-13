"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssetMenu = void 0;
const response_util_1 = __importDefault(require("./response.util"));
const asset_model_1 = __importDefault(require("../models/asset.model"));
// Cache In Memory
const accessCodeRepository = {};
async function getAssetMenu(req, res, next) {
    try {
        // Check Cache First
        if (accessCodeRepository[req.user.id]) {
            console.log('data Cashed');
            return (0, response_util_1.default)(req, res, "OK", 'get all access code for role', accessCodeRepository[req.user.id]);
        }
        const assets = await asset_model_1.default.find({ roles: { $in: req.user.role } }).select("assetsCodes -_id"); //  showToFront: true
        const accessCode = [];
        assets.forEach((item) => {
            accessCode.push(...item.assetsCodes);
        });
        // Cache data
        accessCodeRepository[req.user.id] = accessCode;
        return (0, response_util_1.default)(req, res, "OK", 'get all access code for role', { accessCode });
    }
    catch (error) {
        (0, response_util_1.default)(req, res, "UN_AUTH", `${error.message}`);
    }
}
exports.getAssetMenu = getAssetMenu;
//# sourceMappingURL=get-asset-menu.util.js.map