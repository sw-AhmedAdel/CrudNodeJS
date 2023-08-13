"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProject = exports.addProject = exports.updateDepartment = exports.addDepartment = exports.updateUser = exports.addUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const get_model_options_util_1 = __importDefault(require("../utils/get-model-options.util"));
const joi_schema_genrator_1 = __importDefault(require("../utils/joi-schema-genrator"));
const departmen_model_1 = __importDefault(require("../models/departmen.model"));
const project_model_1 = __importDefault(require("../models/project.model"));
const userOptions = (0, get_model_options_util_1.default)(user_model_1.default);
const departmenOption = (0, get_model_options_util_1.default)(departmen_model_1.default);
const projectOption = (0, get_model_options_util_1.default)(project_model_1.default);
//user
const addUser = (0, joi_schema_genrator_1.default)(userOptions);
exports.addUser = addUser;
const updateUser = addUser.fork(Object.keys(addUser.describe().keys), (field) => field.optional());
exports.updateUser = updateUser;
//department
const addDepartment = (0, joi_schema_genrator_1.default)(departmenOption);
exports.addDepartment = addDepartment;
const updateDepartment = addDepartment.fork(Object.keys(addDepartment.describe().keys), (field) => field.optional());
exports.updateDepartment = updateDepartment;
//project
const addProject = (0, joi_schema_genrator_1.default)(projectOption);
exports.addProject = addProject;
const updateProject = addProject.fork(Object.keys(addProject.describe().keys), (field) => field.optional());
exports.updateProject = updateProject;
//# sourceMappingURL=user.validation.js.map