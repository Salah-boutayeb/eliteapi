const asyncHandler = require("express-async-handler");
const Category = require("../models/CategoryModel");

const Quiz = require("../models/quizTestModel");
const Answer = require("../models/answerModel");

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const getQuestions = asyncHandler(async (req, res) => {
  console.log(req.query);

  let quizes = [];
  const quizesdb = await Quiz.find({
    categoryId: req.query.idCategory,
  }).populate("answers");
  quizesdb.forEach((element) => {
    let answers = {};
    let shuffeledTable = shuffle(element.answers);
    shuffeledTable.forEach((answer) => {
      answers[answer.question] = answer.isCorrect;
    });
    quizes.push({ question: element.title, answers: answers });
  });
  console.log(quizes);
  /*   const quiz = [
    {
      question:
        "How Many Whiskers does the average cat have on each side of its face ?",
      answers: {
        1: false,
        3: false,
        12: true,
        "5,007": false,
      },
    },
    {
      question:
        "How Many Whiskers does the average cat have on each side of its face ?",
      answers: {
        1: false,
        3: false,
        12: true,
        "5,007": false,
      },
    },
    {
      question:
        "How Many Whiskers does the average cat have on each side of its face ?",
      answers: {
        1: false,
        3: false,
        12: true,
        "5,007": false,
      },
    },
    {
      question:
        "How Many Whiskers does the average cat have on each side of its face ?",
      answers: {
        1: false,
        3: false,
        12: true,
        "5,007": false,
      },
    },
    {
      question:
        "How Many Whiskers does the average cat have on each side of its face ?",
      answers: {
        1: false,
        3: false,
        12: true,
        5.007: false,
      },
    },
  ]; */

  res.json(quizes).status(200);
});

const addQuestion = async (req, res) => {
  console.log(req.headers.authorization);
  let answersTable = [];

  const { question, answers, category } = req.body;
  let answer = null;
  const quiz = new Quiz({
    title: question,
    categoryId: category,
  });
  for (const key in answers) {
    if (Object.hasOwnProperty.call(answers, key)) {
      const element = answers[key];
      answer = await Answer.create({
        question: key,
        isCorrect: element,
        quizId: quiz._id,
      });
      answersTable.push(answer);
    }
  }
  quiz.answers = answersTable;
  quiz.save((err) => {
    if (err) {
      return handleError(err);
    }
  });
  res.send("ok1").status(200);
};

module.exports = {
  getQuestions,
  addQuestion,
};
