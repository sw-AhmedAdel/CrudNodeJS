import { Request, Response, NextFunction } from "express";
import urlModel from "../models/asset.model";
import { verifyUser } from "../utils/verfy-user.util";
import { JwtPayload } from "jsonwebtoken";
import responseUtil from "../utils/response.util";
// populate the returned data by specific levels (number)
const generatePopulateOptions = (depth: number) => {
  if (depth <= 0) {
    return null;
  }

  return {
    path: "parent",
    populate: generatePopulateOptions(depth - 1),
  };
};
// get search criteria and levels count
const getLevelsAndCriteria = (req: Request) => {
  let url = req.baseUrl + (req.path == "/" ? "" : req.path); // rm '/' if exist
  url = url.split("v1/")[1]; // get url after 'v1' keyword
  // rm value of params if it's exist
  for (let k in req.params) {
    url = url.replace(`/${req.params[k]}`, "");
  }
  const reqParams = Object.keys(req.params);
  const criteria = reqParams.length > 0 ? { url, params: reqParams } : { url };
  const levelsCount = url.split("/").length + reqParams.length;
  return { criteria, levelsCount };
};
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    // decode token then extract it's values
    const { role, id } = (await verifyUser(req)) as JwtPayload;
    req.user = {
      role,

      id,
      auth: false,
    };
    const { criteria, levelsCount } = getLevelsAndCriteria(req);
    let data = await urlModel
      .findOne(criteria)
      .populate(generatePopulateOptions(10));
    if (!data) return responseUtil(req, res, "NOT_FOUND", "No data");
    let pointer: any = data;
    //console.log(pointer)
    do {
      if (
        pointer.roles?.includes(req.user.role) &&
        (pointer.method === req.method.toLowerCase() || pointer.method === "*")
      ) {
        req.user.auth = true;
        return next();
      }
      pointer = pointer.parent;
    } while (pointer);
    return responseUtil(req, res, "UN_AUTH", "Resource is not allowed");
  } catch (error) {
    return responseUtil(req, res, "INTERNAL_SER_ERR", error.message);
  }
};
