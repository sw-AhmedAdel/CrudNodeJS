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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const variables_config_1 = __importDefault(require("../config/variables.config"));
const fileUtil = __importStar(require("../utils/file.util"));
exports.default = (req, storageType = variables_config_1.default.storageType) => {
    let fileField = fileUtil.getUploadedFilePath(req);
    if (storageType === "filesystem") {
        return fileField;
    }
    else if (storageType === "database") {
        const filePath = path_1.default.join(__dirname, "../../", req.file.path.slice(req.file.path.indexOf("uploads")));
        fileField = fs_1.default.readFileSync(filePath);
        fs_1.default.unlinkSync(filePath);
        return fileField;
    }
    else {
        throw "invalid storage type";
    }
};
//# sourceMappingURL=file-upload-handler.util.js.map