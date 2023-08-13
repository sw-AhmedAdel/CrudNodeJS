"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssetMenuService = exports.addToAssetService = void 0;
const asset_model_1 = __importDefault(require("../models/asset.model"));
// Cache In Memory
const accessCodeRepository = {};
async function addToAssetService(newAsset) {
    let data = await asset_model_1.default.create(newAsset);
    const pipeline = [
        {
            $match: { _id: data._id },
        },
        {
            $graphLookup: {
                from: 'assets',
                startWith: '$parent',
                connectFromField: 'parent',
                connectToField: '_id',
                as: 'assetsParent',
            },
        },
    ];
    let assetsArray = await asset_model_1.default.aggregate(pipeline);
    let assetsIDs = [];
    assetsArray[0].assetsParent.forEach(element => {
        assetsIDs.push(element._id);
    });
    await asset_model_1.default.updateMany({ _id: { $in: assetsIDs } }, { $push: { assetsCodes: data.accessCode } }, { new: true });
    return {
        message: 'A New Asset is Added Successfully.',
        status: "OK",
        data
    };
}
exports.addToAssetService = addToAssetService;
async function getAssetMenuService(role, user_id) {
    // Check Cache First
    if (accessCodeRepository[user_id]) {
        console.log('data Cashed');
        return {
            message: 'get all access code for role',
            status: "OK",
            data: accessCodeRepository[user_id]
        };
    }
    const assets = await asset_model_1.default.find({ roles: { $in: role } }).select("assetsCodes -_id"); //  showToFront: true
    const accessCode = [];
    assets.forEach((item) => {
        accessCode.push(...item.assetsCodes);
    });
    // Cache data
    accessCodeRepository[user_id] = accessCode;
    return {
        message: 'get all access code for role',
        status: "OK",
        data: accessCodeRepository[user_id]
    };
}
exports.getAssetMenuService = getAssetMenuService;
//# sourceMappingURL=asset.service.js.map