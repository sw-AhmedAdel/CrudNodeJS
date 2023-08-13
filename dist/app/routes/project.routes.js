"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const project_model_1 = __importDefault(require("../models/project.model"));
const factory_controller_1 = __importDefault(require("../controllers/factory.controller"));
const projectCtrlFactory = new factory_controller_1.default(project_model_1.default);
const validation_mw_1 = __importDefault(require("../middlewares/validation.mw"));
const check_permissions_mw_1 = __importDefault(require("../middlewares/check-permissions.mw"));
// Parent 1 // get  post
router
    .route("/")
    .post((0, check_permissions_mw_1.default)("create", "project"), (req, res, next) => (0, validation_mw_1.default)(next, ["addProject", req.body]), projectCtrlFactory.create)
    .get((0, check_permissions_mw_1.default)("read", "project"), projectCtrlFactory.getAll(""));
router
    .route("/search")
    .post((0, check_permissions_mw_1.default)("search", "project"), projectCtrlFactory.search("", ["employeesNumber"]));
router
    .route("/options")
    .get((0, check_permissions_mw_1.default)("options", "project"), projectCtrlFactory.getOptions);
// 2 patch  get  delete
router
    .route("/:id")
    .all((req, res, next) => (0, validation_mw_1.default)(next, ["mongoId", req.params.id]))
    .get((0, check_permissions_mw_1.default)("readID", "project"), projectCtrlFactory.getById("id"))
    .patch((0, check_permissions_mw_1.default)("update", "project"), (req, res, next) => (0, validation_mw_1.default)(next, ["updateProject", req.body]), projectCtrlFactory.updateById("id"))
    .delete((0, check_permissions_mw_1.default)("delete", "project"), projectCtrlFactory.deleteById("id"));
exports.default = router;
//# sourceMappingURL=project.routes.js.map