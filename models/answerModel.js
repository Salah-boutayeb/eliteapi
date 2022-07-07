const mongoose = require("mongoose");
const questionSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "please add a text value"],
    },
    isCorrect: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Answer", questionSchema);
