"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = (fields) => {
    let JoiSchema = {};
    for (let { options, name, type } of fields) {
        if (options.type !== "file") {
            let fieldSchema = joi_1.default[type]()[options.required ? "required" : "optional"]();
            if (options.controlType === "email") {
                fieldSchema = fieldSchema.email();
            }
            if (options.validation) {
                for (let k in options.validation) {
                    if (typeof fieldSchema[k] === "function") {
                        if (k === "valid") {
                            fieldSchema = fieldSchema.valid(...options.validation[k]);
                        }
                        else {
                            fieldSchema = fieldSchema[k](options.validation[k]);
                        }
                    }
                }
            }
            JoiSchema[name] = fieldSchema;
        }
    }
    return joi_1.default.object(JoiSchema);
};
//# sourceMappingURL=joi-schema-genrator.js.map