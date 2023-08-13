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
exports.error = exports.info = void 0;
const winston_1 = __importStar(require("winston"));
const path_1 = __importDefault(require("path"));
const logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.printf((info) => {
        let message = `${new Date().toLocaleString()} |  ${info.level.toUpperCase()} | ${info.message} | `;
        message = info.obj
            ? message + `data ${JSON.stringify(info.obj)} | `
            : message;
        return message;
    }),
    transports: [
        new winston_1.transports.File({
            filename: path_1.default.join(__dirname, "../../../logs", "logfile.log"),
        }),
        new winston_1.transports.File({
            level: "error",
            filename: path_1.default.join(__dirname, "../../../logs", "errlogfile.log"),
        }),
    ],
});
const info = async (message, obj = null) => {
    logger.log("info", message, { obj });
};
exports.info = info;
const error = async (message, obj = null) => {
    logger.log("error", message, { obj });
};
exports.error = error;
//# sourceMappingURL=logging.util.js.map