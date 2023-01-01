const asyncHandler = require("express-async-handler");
const Category = require("../models/CategoryModel");
const User = require("../models/userModel");
const Quiz = require("../models/quizTestModel");

const getQuizes = asyncHandler(async (req, res) => {
  console.log(req.query.id);
  const quizes = [];
  const category = await Category.find({ name: req.query.name });

  /*   const quizes = [
    {
      title: "title of quiz number 1",
    },
    {
      title: "title of quiz number 1",
      points: 50,
    },
    {
      title: "title of quiz number 1",
      points: 50,
    },
    {
      title: "title of quiz number 1",
      points: 50,
    },
    {
      title: "title of quiz number 1",
      points: 50,
    },
  ]; */
  res.json(quizes).status(200);
});

module.exports = {
  getQuizes,
};
