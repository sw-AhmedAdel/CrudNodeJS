"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_model_1 = __importDefault(require("../models/post.model"));
const router = (0, express_1.Router)();
const file_upload_mw_1 = __importDefault(require("../middlewares/file-upload.mw"));
const file_upload_handler_util_1 = __importDefault(require("../utils/file-upload-handler.util"));
router.post("/", (0, file_upload_mw_1.default)("uploads/posts", [".jpeg"]).single("image"), async function (req, res) {
    try {
        const { title } = req.body;
        const image = (0, file_upload_handler_util_1.default)(req, "database");
        const post = new post_model_1.default({ title, image });
        await post.save();
        res.status(201).json(post);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create a new post" });
    }
});
router.get("/", async (req, res) => {
    try {
        const posts = await post_model_1.default.find();
        res.status(201).json(posts);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create a new post" });
    }
});
exports.default = router;
//# sourceMappingURL=post.routes.js.map