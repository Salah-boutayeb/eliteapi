const mongoose = require("mongoose");
const quizTestSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please add a text value"],
    },
    points: {
      type: mongoose.Schema.Types.Number,
      default: 50,
    },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Quiz", quizTestSchema);
