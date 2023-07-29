const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
    createBlog,
    updateBlog,
    getBlog,
    getAllBlogs,
    deleteBlog,
    liketheBlog,
    uploadImages
} = require("../controller/blogCtrl");
const { blogImgResize, uploadPhoto } = require("../middlewares/uploadImage");

router.post("/", authMiddleware, isAdmin, createBlog);
router.put(
    "/upload/:id",
    authMiddleware,
    isAdmin,
    uploadPhoto.array("images", 2),
    blogImgResize,
    uploadImages
);
router.put("/likes", authMiddleware, liketheBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlogs);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;