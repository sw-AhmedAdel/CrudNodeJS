import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  image: {
    type: Buffer,
  },
  title: String,
});
export default mongoose.model("Post", postSchema);
