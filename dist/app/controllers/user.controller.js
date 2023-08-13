"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateImage = exports.create = void 0;
const error_util_1 = __importDefault(require("../utils/error.util"));
const userService = __importStar(require("../services/user.service"));
const factory_service_1 = __importDefault(require("../services/factory.service"));
const response_util_1 = __importDefault(require("../utils/response.util"));
const file_upload_handler_util_1 = __importDefault(require("../utils/file-upload-handler.util"));
const user_model_1 = __importDefault(require("../models/user.model"));
const serviceFac = new factory_service_1.default(user_model_1.default);
const create = async (req, res, next) => {
    try {
        req.body["image"] = (0, file_upload_handler_util_1.default)(req, "filesystem");
        const data = await userService.create(req.body);
        (0, response_util_1.default)(req, res, "OK", "user created", { data });
    }
    catch (err) {
        next(new error_util_1.default(err.message, err.statusCode));
    }
};
exports.create = create;
const updateImage = async (req, res, next) => {
    try {
        const imagePath = (0, file_upload_handler_util_1.default)(req, "filesystem");
        const data = await userService.updateImage(req.params["id"], imagePath);
        if (!data)
            (0, response_util_1.default)(req, res, "NOT_FOUND", "user does not exist");
        (0, response_util_1.default)(req, res, "OK", "user image updated successfully", {
            data: { _id: data._id, image: imagePath },
        });
    }
    catch (err) {
        next(new error_util_1.default(err.message, err.status));
    }
};
exports.updateImage = updateImage;
//# sourceMappingURL=user.controller.js.map