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
const http_status_code_config_1 = __importDefault(require("../config/http-status-code.config"));
const loggingUtil = __importStar(require("./logging.util"));
exports.default = (req, res, status, message, result = null) => {
    res.locals.message = message;
    res.locals.result = JSON.stringify(result);
    const statusCode = http_status_code_config_1.default[status] || res.statusCode;
    loggingUtil.info(`${req.protocol} | ${req.method} | ${statusCode} | body : ${JSON.stringify(req.body)} |${req.originalUrl} |${message}`, result);
    return res.status(statusCode).json({ message, result });
};
//# sourceMappingURL=response.util.js.map