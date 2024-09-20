import asyncHandler from "express-async-handler";
import { Question } from "../models/questionModel";

const getQuestions = asyncHandler(async (req: any, res: any) => {
  const questions = await Question.find();
  res.status(200).json(questions);
});

const createQuestion = asyncHandler(async (req: any, res: any) => {
  const { title, body, tags } = req.body;
  const question = new Question({
    title,
    body,
    tags,
    user: {
      username: req.user.username,
      _id: req.user.id,
    },
  });
  const createdQuestion = await question.save();
  res.status(201).json(createdQuestion);
});

export { getQuestions, createQuestion };
