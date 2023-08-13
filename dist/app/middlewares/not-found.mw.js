"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_util_1 = __importDefault(require("../utils/error.util"));
exports.default = (req, res, next) => {
    next(new error_util_1.default("not found endpoint", 404));
};
//# sourceMappingURL=not-found.mw.js.map