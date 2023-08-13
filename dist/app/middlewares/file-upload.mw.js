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
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const error_util_1 = __importDefault(require("../utils/error.util"));
const fileUtil = __importStar(require("../utils/file.util"));
const fileUpload = (dir, exts, fileSize = 1000000) => {
    const storage = multer_1.default.diskStorage({
        destination(req, file, cb) {
            const dirPath = path_1.default.join(__dirname, "../", "../", dir);
            fileUtil.createDir(dirPath);
            cb(null, dirPath);
        },
        filename(req, file, cb) {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + file.originalname);
        },
    });
    const fileFilter = (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        if (exts.includes(ext))
            return cb(null, true);
        cb(new error_util_1.default("file upload faild , invalid extention", 442));
    };
    return (0, multer_1.default)({ storage, fileFilter, limits: { fileSize } });
};
exports.default = fileUpload;
//# sourceMappingURL=file-upload.mw.js.map