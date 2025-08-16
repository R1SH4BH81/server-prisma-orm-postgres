const express = require("express");
const router = express.Router();
const {
  getAll,
  updatePost,
  createPost,
  deletePost,
} = require("../controllers/post.controllers");

const protect = require("../middlewares/auth.middlewares");

router.post("/", protect, createPost);
router.get("/", getAll);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;
