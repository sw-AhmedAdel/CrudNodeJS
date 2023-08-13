//import { getAssetMenu } from "../utils/get-asset-menu.util";
import { getAssetMenu } from "../controllers/asset.controller";
import { Router } from "express";
import { checkRole } from "../middlewares/check-role.mw";
import { add } from "winston";
import { addToAsset } from "../controllers/asset.controller";
const router = Router();
// add checkRoleMw in production
router.get("/getAccessCodes", getAssetMenu);
router.post("/addToAsset", addToAsset);

export default router;
