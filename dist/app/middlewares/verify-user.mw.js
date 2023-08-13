"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserMW = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const error_util_1 = __importDefault(require("../utils/error.util"));
async function verifyUserMW(req, res, next) {
    let token = "";
    try {
        if (req.headers["authorization"]?.startsWith(`${process.env.BEARER_SECRET}`)) {
            token = req.headers["authorization"].split(" ")[1];
        }
        if (!token) {
            throw Error("In-valid Token");
        }
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.TOKEN_SIGNATURE);
        console.log(decoded);
        req.user = decoded;
        next();
    }
    catch (error) {
        next(new error_util_1.default(error.message, error.status));
    }
}
exports.verifyUserMW = verifyUserMW;
//# sourceMappingURL=verify-user.mw.js.map