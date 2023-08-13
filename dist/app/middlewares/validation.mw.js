"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_validation_1 = __importDefault(require("../validation/index.validation"));
const error_util_1 = __importDefault(require("../utils/error.util"));
exports.default = (next, ...input) => {
    for (let [schema, target] of input) {
        const { error } = (0, index_validation_1.default)(schema, target);
        if (error) {
            const errorMessage = error.details
                .map((detail) => detail.message)
                .join(", ");
            throw new error_util_1.default(errorMessage, 409);
        }
    }
    next();
};
//# sourceMappingURL=validation.mw.js.map