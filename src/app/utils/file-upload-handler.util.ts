import fs from "fs";
import { Request } from "express";
import path from "path";
import variablesConfig from "../config/variables.config";
import * as fileUtil from "../utils/file.util";
export default (
  req: Request,
  storageType: "filesystem" | "database" = variablesConfig.storageType as
    | "filesystem"
    | "database"
) => {
  let fileField: string | Buffer = fileUtil.getUploadedFilePath(req);
  if (storageType === "filesystem") {
    return fileField;
  } else if (storageType === "database") {
    const filePath = path.join(
      __dirname,
      "../../",
      req.file.path.slice(req.file.path.indexOf("uploads"))
    );
    fileField = fs.readFileSync(filePath);
    fs.unlinkSync(filePath);
    return fileField;
  } else {
    throw "invalid storage type";
  }
};
