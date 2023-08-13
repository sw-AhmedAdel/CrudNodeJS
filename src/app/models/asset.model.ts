import mongoose, { Schema } from "mongoose";
const assetSchema = new Schema(
  {
    url: String, // users/:id
    method: String, // ['get' , 'post']
    parent: { type: Schema.Types.ObjectId, ref: "Asset", default: null }, // users
    roles: Array, // ['admin' , 'hr']
    showToFront: Boolean,
    accessCode: {
      type: String,
      unique: true,
    },
    assetType: {
      type: String,
      enum: ["rest", "business"],
    },
    assetsCodes: Array,
  },
  { strict: false }
);

export default mongoose.model("Asset", assetSchema);
