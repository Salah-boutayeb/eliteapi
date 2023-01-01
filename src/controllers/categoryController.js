const asyncHandler = require("express-async-handler");
const Category = require("../models/CategoryModel");
const User = require("../models/userModel");
const Quiz = require("../models/quizTestModel");
const Answer = require("../models/answerModel");

const getCategories = asyncHandler(async (req, res) => {
  const categorys = await Category.find();
  console.log("i need categories");

  res.json(categorys).status(200);
});
const updateCategory = asyncHandler(async (req, res) => {
  const updatedCategory = await Category.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
    }
  );
  console.log(updatedCategory);
  res.json({ updatedCategory }).status(200);
});
const deleteCategory = asyncHandler(async (req, res) => {
  console.log("delete  --->" + req.query.idCategory);
  const category = await Category.findById({ _id: req.query.idCategory });

  const quizes = await Quiz.find({ categoryId: category._id });
  quizes.forEach(async (quiz) => {
    await Answer.deleteMany({ quizId: quiz._id });
    quiz.remove();
  });
  category.remove();
  if (!category) {
    res.status(401);
    throw new Error("Category not found");
  }

  res.json({ id: category.id }).status(200);
});
const postCategory = asyncHandler(async (req, res) => {
  console.log("new category");
  console.log(req.headers.authorization);
  if (!req.body.name) {
    res.status(400);
    throw new Error("please add a name field");
  }
  const { name } = req.body;
  console.log(name);

  const category = await Category.create({ name: name });
  res.json({ category }).status(200);
});
module.exports = {
  getCategories,
  updateCategory,
  postCategory,
  deleteCategory,
};
