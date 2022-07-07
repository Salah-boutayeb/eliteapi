const asyncHandler = require("express-async-handler");
const Category = require("../models/CategoryModel");
const User = require("../models/userModel");
const Quiz = require("../models/quizTestModel");

const getQuizes = asyncHandler(async (req, res) => {
  console.log(req.query.id);
  const quizes = [];
  const category = await Category.find({ name: req.query.name });

  console.log(quizes);
  console.log(quizes);

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

const addQuiz = async (req, res) => {
  console.log(req.body);

  const { question, answers, category } = req.body;

  res.send("ok").status(200);
};

const deleteQuiz = async (req, res) => {
  console.log(req.body);
  res.send("ok").status(200);
};

module.exports = {
  getQuizes,
  addQuiz,
  deleteQuiz,
};
