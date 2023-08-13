"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const verfy_user_util_1 = require("../utils/verfy-user.util");
const response_util_1 = __importDefault(require("../utils/response.util"));
async function checkRole(req, res, next) {
    try {
        const userData = (await (0, verfy_user_util_1.verifyUser)(req));
        // Attach to Request
        req.user = {
            role: userData.role.toLowerCase(),
            id: userData.id,
        };
        return next();
    }
    catch (error) {
        (0, response_util_1.default)(req, res, "INTERNAL_SER_ERR", error.message);
    }
}
exports.checkRole = checkRole;
//# sourceMappingURL=check-role.mw.js.map