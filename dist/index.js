"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app/app"));
const mongoose_1 = __importDefault(require("mongoose"));
// mongoose.set('debug', true);
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("db connection success");
    app_1.default.listen(process.env.PORT, () => {
        console.log("server is running on port ", process.env.PORT);
    });
})
    .catch((err) => {
    console.log(err.message);
});
//# sourceMappingURL=index.js.map