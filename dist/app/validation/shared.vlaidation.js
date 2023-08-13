"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileSchema = exports.mongoIdSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoIdSchema = joi_1.default.string().length(24).hex().required();
exports.mongoIdSchema = mongoIdSchema;
const fileSchema = joi_1.default.binary().min(1).max(5242880).required();
exports.fileSchema = fileSchema;
//# sourceMappingURL=shared.vlaidation.js.map