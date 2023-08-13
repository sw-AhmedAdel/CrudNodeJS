import { Request } from "express";
import path from "path";
import multer from "multer";
import ApiError from "../utils/error.util";
import * as fileUtil from "../utils/file.util";
const fileUpload = (
  dir: string,
  exts: string[],
  fileSize: number = 1000000
) => {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      const dirPath = path.join(__dirname, "../", "../", dir);
      fileUtil.createDir(dirPath);
      cb(null, dirPath);
    },
    filename(req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + file.originalname);
    },
  });
  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    const ext = path.extname(file.originalname);
    if (exts.includes(ext)) return cb(null, true);
    cb(new ApiError("file upload faild , invalid extention", 442));
  };
  return multer({ storage, fileFilter, limits: { fileSize } });
};
export default fileUpload;
