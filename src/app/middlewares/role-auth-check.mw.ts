import { Request, Response, NextFunction } from "express";
import assetModel from "../models/asset.model";
import { verifyUser } from "../utils/verfy-user.util";
import { JwtPayload } from "jsonwebtoken";
import responseUtil from "../utils/response.util";

function getCriteria(req: Request){
    let url = req.baseUrl + (req.path == "/" ? "" : req.path); // rm '/' if exist
    url = url.split("v1/")[1]; // get url after 'v1' keyword
    // rm value of params if it's exist
    for (let k in req.params) {
      url = url.replace(`/${req.params[k]}`, "");
    }
    const reqParams = Object.keys(req.params);
    const criteria = reqParams.length > 0 ? { url, params: reqParams } : { url };

    return criteria;
}


export async function checkAccessRole(req: Request, res: Response, next: NextFunction) {

  try {
    // decode token then extract it's values
    const { role, id } = (await verifyUser(req)) as JwtPayload;
    req.user = {
      role,
      id,
      auth: false,
    };
    
    const criteria = getCriteria(req);
    
    const pipeline = [
        {
          $match:  criteria
        },
        {
          $graphLookup: {
            from: 'assets',
            startWith: '$_id',
            connectFromField: 'parent',
            connectToField: '_id',
            as: 'assetsParent',
          },
        },
      ];

      let assets = await assetModel.aggregate(pipeline);

      
      if (assets[0].assetsParent.length < 1) return responseUtil(req, res, "NOT_FOUND", "No data");

      for(let i=0; i < assets[0].assetsParent.length ; i++ ){
        if(assets[0].assetsParent[i].roles.includes(req.user.role)){
            req.user.auth = true;
            return next();
        }
      }


    return responseUtil(req, res, "UN_AUTH", "Resource is not allowed");
      
  } catch (error) {
    
    return responseUtil(req, res, "INTERNAL_SER_ERR", error.message);
  }
};