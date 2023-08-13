"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
async function verifyUser(req) {
    let token = "";
    if (req.headers["authorization"]?.startsWith(`${process.env.BEARER_SECRET}`)) {
        token = req.headers["authorization"].split(" ")[1];
    }
    console.log(token);
    if (!token) {
        throw Error("In-valid Token");
    }
    return (0, jsonwebtoken_1.verify)(token, process.env.TOKEN_SIGNATURE);
}
exports.verifyUser = verifyUser;
//# sourceMappingURL=verfy-user.util.js.map