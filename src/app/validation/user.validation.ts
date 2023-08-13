import Joi from "joi";
import userModel from "../models/user.model";
import modelOptionsUtil from "../utils/get-model-options.util";
import joiSchemaGenerator from "../utils/joi-schema-genrator";
import departmenModel from "../models/departmen.model";
import projectModel from "../models/project.model";
const userOptions = modelOptionsUtil(userModel);
const departmenOption = modelOptionsUtil(departmenModel)
const projectOption= modelOptionsUtil(projectModel)

//user
const addUser = joiSchemaGenerator(userOptions);

const updateUser = addUser.fork(Object.keys(addUser.describe().keys), (field) =>
  field.optional()
);

//department
const addDepartment=joiSchemaGenerator(departmenOption);

const updateDepartment = addDepartment.fork(Object.keys(addDepartment.describe().keys), (field) =>
  field.optional()
);

//project
const addProject=joiSchemaGenerator(projectOption);

const updateProject = addProject.fork(Object.keys(addProject.describe().keys), (field) =>
  field.optional()
);

export { addUser, updateUser , addDepartment, updateDepartment, addProject, updateProject};
