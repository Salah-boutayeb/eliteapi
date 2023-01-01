const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a text value"],
    },

    quizes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
