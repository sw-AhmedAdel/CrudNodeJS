import path from "path";
import userModel from "../models/user.model";
import fs from "fs";
const create = (data: any) => {
  return new userModel(data).save();
};
const updateImage = async (id: string, imagePath: string) => {
  const data = await userModel
    .findByIdAndUpdate(id, {
      $set: { image: imagePath },
    })
    .select("image");
  if (!data) return null;
  fs.unlinkSync(
    path.join(__dirname, "../../uploads/users", path.basename(data.image))
  );

  return data;
};
export { updateImage, create };
