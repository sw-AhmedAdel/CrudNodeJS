import fs from "fs";
import { Request } from "express";
const createDir = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
};
const getUploadedFilePath = (req: Request) =>
  req.protocol +
  "://" +
  req.get("host") +
  "/" +
  req.file.path.slice(req.file.path.indexOf("uploads"));
export { createDir, getUploadedFilePath };
