"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUploadedFilePath = exports.createDir = void 0;
const fs_1 = __importDefault(require("fs"));
const createDir = (dirPath) => {
    if (!fs_1.default.existsSync(dirPath))
        fs_1.default.mkdirSync(dirPath, { recursive: true });
};
exports.createDir = createDir;
const getUploadedFilePath = (req) => req.protocol +
    "://" +
    req.get("host") +
    "/" +
    req.file.path.slice(req.file.path.indexOf("uploads"));
exports.getUploadedFilePath = getUploadedFilePath;
//# sourceMappingURL=file.util.js.map