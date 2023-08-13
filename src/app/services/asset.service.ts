
import assetModel from "../models/asset.model";

// Cache In Memory
const accessCodeRepository = {};

export async function addToAssetService(newAsset) {
    let data = await assetModel.create(newAsset);
    
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
    let assetsArray = await assetModel.aggregate(pipeline);
  
    let assetsIDs = [];
  
    assetsArray[0].assetsParent.forEach(element => {
      assetsIDs.push(element._id);
    });
    
    await assetModel.updateMany(
      {_id: {$in: assetsIDs}},
      { $push: { assetsCodes: data.accessCode } },
      {new: true}
    );

    return {
        message: 'A New Asset is Added Successfully.',
        status: "OK",
        data
    }
}

export async function getAssetMenuService(role:string, user_id:string) {
          // Check Cache First
          if(accessCodeRepository[user_id]){
            console.log('data Cashed');
            
            return{
              message: 'get all access code for role',
              status: "OK",
              data: accessCodeRepository[user_id]
            }
        }

        const assets = await assetModel.find({roles:{$in: role}}).select("assetsCodes -_id"); //  showToFront: true

        const accessCode = [];
    
        assets.forEach((item)=>{
            accessCode.push(...item.assetsCodes)
        })

        // Cache data
        accessCodeRepository[user_id] = accessCode;
        return{
          message: 'get all access code for role',
          status: "OK",
          data: accessCodeRepository[user_id]
        }

}