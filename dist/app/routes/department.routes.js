"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const departmen_model_1 = __importDefault(require("../models/departmen.model"));
const factory_controller_1 = __importDefault(require("../controllers/factory.controller"));
const departmentCtrlFactory = new factory_controller_1.default(departmen_model_1.default);
const validation_mw_1 = __importDefault(require("../middlewares/validation.mw"));
const check_permissions_mw_1 = __importDefault(require("../middlewares/check-permissions.mw"));
// Parent 1 // get  post
router
    .route("/")
    .post((0, check_permissions_mw_1.default)("create", "department"), (req, res, next) => (0, validation_mw_1.default)(next, ["addDepartment", req.body]), departmentCtrlFactory.create)
    .get((0, check_permissions_mw_1.default)("read", "department"), departmentCtrlFactory.getAll(""));
router
    .route("/search")
    .post((0, check_permissions_mw_1.default)("search", "department"), departmentCtrlFactory.search("", ["employeesNumber"]));
router
    .route("/options")
    .get((0, check_permissions_mw_1.default)("options", "department"), departmentCtrlFactory.getOptions);
// 2 patch  get  delete
router
    .route("/:id")
    .all((req, res, next) => (0, validation_mw_1.default)(next, ["mongoId", req.params.id]))
    .get((0, check_permissions_mw_1.default)("readID", "department"), departmentCtrlFactory.getById("id"))
    .patch((0, check_permissions_mw_1.default)("update", "department"), (req, res, next) => (0, validation_mw_1.default)(next, ["updateDepartment", req.body]), departmentCtrlFactory.updateById("id"))
    .delete((0, check_permissions_mw_1.default)("delete", "department"), departmentCtrlFactory.deleteById("id"));
exports.default = router;
//# sourceMappingURL=department.routes.js.map