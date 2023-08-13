"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssetMenu = exports.addToAsset = void 0;
const asset_service_1 = require("../services/asset.service");
const response_util_1 = __importDefault(require("../utils/response.util"));
async function addToAsset(req, res) {
    try {
        let result = await (0, asset_service_1.addToAssetService)(req.body);
        return (0, response_util_1.default)(req, res, result.status, result.message, result.data);
    }
    catch (error) {
        return (0, response_util_1.default)(req, res, "INTERNAL_SER_ERR", error.message);
    }
}
exports.addToAsset = addToAsset;
async function getAssetMenu(req, res) {
    try {
        const assets = {
            assetsCodes: req.user.permissions,
        };
        (0, response_util_1.default)(req, res, "OK", "", assets);
    }
    catch (error) {
        return (0, response_util_1.default)(req, res, "INTERNAL_SER_ERR", error.message);
    }
}
exports.getAssetMenu = getAssetMenu;
//# sourceMappingURL=asset.controller.js.map