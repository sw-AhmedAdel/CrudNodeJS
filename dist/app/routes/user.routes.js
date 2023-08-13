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
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_model_1 = __importDefault(require("../models/user.model"));
const factory_controller_1 = __importDefault(require("../controllers/factory.controller"));
const userCtrlFactory = new factory_controller_1.default(user_model_1.default);
const file_upload_mw_1 = __importDefault(require("../middlewares/file-upload.mw"));
const userController = __importStar(require("../controllers/user.controller"));
const validation_mw_1 = __importDefault(require("../middlewares/validation.mw"));
const check_permissions_mw_1 = __importDefault(require("../middlewares/check-permissions.mw"));
const userImageMw = (0, file_upload_mw_1.default)("uploads/users/", [".png", ".jpeg"]).single("image");
//router.get("/template/form", userCtrlFactory.getFormTemplate);
//
router
    .route("/search")
    .post((0, check_permissions_mw_1.default)("search", "user"), userCtrlFactory.search("", ["gender", "ssn"]));
router.get("/options", (0, check_permissions_mw_1.default)("options", "user"), userCtrlFactory.getOptions);
// Parent 1 // get  post
router
    .route("/")
    .post((0, check_permissions_mw_1.default)("create", "user"), userImageMw, (req, res, next) => (0, validation_mw_1.default)(next, ["addUser", req.body]), userController.create)
    .get((0, check_permissions_mw_1.default)("read", "user"), userCtrlFactory.getAll("image firstName"));
// 2
router.patch("/uploadImage/:id", (0, check_permissions_mw_1.default)("updateImage", "user"), userImageMw, (req, res, next) => (0, validation_mw_1.default)(next, ["mongoId", req.params.id]), userController.updateImage);
router // 2 patch  get  delete
    .route("/:id")
    .all((req, res, next) => (0, validation_mw_1.default)(next, ["mongoId", req.params.id]))
    .get((0, check_permissions_mw_1.default)("readID", "user"), userCtrlFactory.getById("id"))
    .patch((0, check_permissions_mw_1.default)("update", "user"), (req, res, next) => (0, validation_mw_1.default)(next, ["updateUser", req.body]), userCtrlFactory.updateById("id"))
    .delete((0, check_permissions_mw_1.default)("delete", "user"), userCtrlFactory.deleteById("id"));
// router.get('getOne/:id' ,userCtrlFactory.getById('id') )
// router.get('delOne/:id' ,userCtrlFactory.deleteById('id') )
// router.get('pathOne/:id' ,userCtrlFactory.updateById('id') )
exports.default = router;
//# sourceMappingURL=user.routes.js.map