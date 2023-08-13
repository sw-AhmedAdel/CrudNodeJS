"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.updateImage = void 0;
const path_1 = __importDefault(require("path"));
const user_model_1 = __importDefault(require("../models/user.model"));
const fs_1 = __importDefault(require("fs"));
const create = (data) => {
    return new user_model_1.default(data).save();
};
exports.create = create;
const updateImage = async (id, imagePath) => {
    const data = await user_model_1.default
        .findByIdAndUpdate(id, {
        $set: { image: imagePath },
    })
        .select("image");
    if (!data)
        return null;
    fs_1.default.unlinkSync(path_1.default.join(__dirname, "../../uploads/users", path_1.default.basename(data.image)));
    return data;
};
exports.updateImage = updateImage;
//# sourceMappingURL=user.service.js.map