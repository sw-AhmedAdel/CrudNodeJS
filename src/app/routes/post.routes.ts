import { Router } from "express";
import Post from "../models/post.model";
const router = Router();
import fileUploadMw from "../middlewares/file-upload.mw";
import fileUploadHandlerMw from "../utils/file-upload-handler.util";
router.post(
  "/",
  fileUploadMw("uploads/posts", [".jpeg"]).single("image"),
  async function (req, res){
    try {
      const { title } = req.body;
      const image = fileUploadHandlerMw(req, "database");
      const post = new Post({ title, image });
      await post.save();
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to create a new post" });
    }
  }
);
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new post" });
  }
});
export default router;
