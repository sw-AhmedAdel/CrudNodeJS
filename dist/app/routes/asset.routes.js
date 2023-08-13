"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { getAssetMenu } from "../utils/get-asset-menu.util";
const asset_controller_1 = require("../controllers/asset.controller");
const express_1 = require("express");
const asset_controller_2 = require("../controllers/asset.controller");
const router = (0, express_1.Router)();
// add checkRoleMw in production
router.get("/getAccessCodes", asset_controller_1.getAssetMenu);
router.post("/addToAsset", asset_controller_2.addToAsset);
exports.default = router;
//# sourceMappingURL=asset.routes.js.map