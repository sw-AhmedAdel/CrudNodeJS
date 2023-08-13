import { addUser, updateUser, addDepartment, updateDepartment ,addProject,updateProject } from "./user.validation";
import * as shardValid from "./shared.vlaidation";
import joiSchema from "../types/joi-schema.type";
const joiSchmes = {
  addUser,
  updateUser,
  addDepartment,
  updateDepartment,
  addProject,
  updateProject,
  mongoId: shardValid.mongoIdSchema,
  file: shardValid.fileSchema,
};
export default (
  joiSchema: joiSchema,
  target: any
) => {
  return joiSchmes[joiSchema].validate(target);
};
