const express = require("express");
const router = express.Router();
const {
  getQuestions,
  addQuestion,
} = require("../controllers/questionController");
const { getQuizes } = require("../controllers/quizController");
const { protect } = require("../middleware/authMiddelware");

router.get("/questions", protect, getQuestions);
router.get("/category", protect, getQuizes);

router.post("/", protect, addQuestion);

module.exports = router;
