import { Request, Response, NextFunction } from "express";
import responseUtil from "./response.util";
import assetModel from "../models/asset.model";


// Cache In Memory
const accessCodeRepository = {};

export async function getAssetMenu(req: Request, res: Response, next: NextFunction) {

    try{     
        // Check Cache First
        if(accessCodeRepository[req.user.id]){
            console.log('data Cashed');
            
            return responseUtil(req, res,"OK", 'get all access code for role' , accessCodeRepository[req.user.id] )
        }

        const assets = await assetModel.find({roles:{$in: req.user.role}}).select("assetsCodes -_id"); //  showToFront: true

        const accessCode = [];
    
        assets.forEach((item)=>{
            accessCode.push(...item.assetsCodes)
        })

        // Cache data
        accessCodeRepository[req.user.id] = accessCode;

        return responseUtil(req, res,"OK", 'get all access code for role' , {accessCode} )

    }catch(error){
        responseUtil(req, res,"UN_AUTH", `${error.message}` );
    }
}