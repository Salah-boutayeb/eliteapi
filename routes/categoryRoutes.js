const express = require("express");
const router = express.Router();
const {
  postCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddelware");

router.get("/", protect, getCategories);
router.post("/", postCategory);
router.post("/:id", protect, updateCategory);
router.delete("/", protect, deleteCategory);

module.exports = router;
