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
const mongoose_1 = __importStar(require("mongoose"));
const options_generator_util_1 = __importDefault(require("../utils/options-generator.util"));
const userSchema = new mongoose_1.Schema({
    image: {
        type: String,
        options: (0, options_generator_util_1.default)("profile image", {
            type: "file",
            controlType: "file",
        }),
    },
    firstName: {
        type: String,
        options: (0, options_generator_util_1.default)("first name", {
            placeholder: "ex : mahmoud",
            validation: {
                min: 3,
                max: 10,
            },
        }),
    },
    middleName: {
        type: String,
        options: (0, options_generator_util_1.default)("middle name", {
            placeholder: "ex : fady",
            validation: {
                min: 3,
                max: 10,
            },
        }),
    },
    thirdName: {
        type: String,
        options: (0, options_generator_util_1.default)("third name", {
            placeholder: "ex : ameen",
            validation: {
                min: 3,
                max: 10,
            },
        }),
    },
    email: {
        type: String,
        unique: true,
        options: (0, options_generator_util_1.default)("user email", {
            placeholder: "ex : xyz@ex.com",
            controlType: "email",
        }),
    },
    ssn: {
        type: Number,
        unique: true,
        validate: {
            validator: function (val) {
                return new String(val).length == 14;
            },
            message: ({ value }) => `${value} isn't valid!`,
        },
        options: (0, options_generator_util_1.default)("national id", {
            placeholder: "ex : 12345678912345",
            controlType: "number",
            validation: { length: 14 },
        }),
    },
    birthDate: {
        type: Date,
        options: (0, options_generator_util_1.default)("birth date", {
            placeholder: "ex : 20/5/2023",
            controlType: "date",
        }),
    },
    address: {
        type: String,
        options: (0, options_generator_util_1.default)("address", {
            placeholder: "ex : abasia , cairo , egypt",
            validation: { min: 8 },
        }),
    },
    gender: {
        type: String,
        options: (0, options_generator_util_1.default)("gender", {
            placeholder: "ex : male",
            controlType: "radio",
            values: ["male", "female"],
            validation: {
                valid: ["male", "female"],
            },
        }),
    },
});
exports.default = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=user.model.js.map