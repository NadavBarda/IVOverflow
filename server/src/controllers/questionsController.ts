import asyncHandler from "express-async-handler";
import { Question } from "../models/questionModel";
import { User } from "../models/userModel";
import { Request, Response } from "express";

const getQuestions = asyncHandler(async (req: Request, res: Response) => {
  const questions = await Question.find()
  res.status(200).json(questions);
});

const getQuestion = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const question = await Question.findById(id).populate("answers").exec();
  res.status(200).json(question);
});

const createQuestion = asyncHandler(async (req: Request, res: Response) => {
  const { title, body, tags, user } = req.body;
  const question = new Question({
    title,
    body,
    tags,
    user: {
      username: user.username,
      _id: user.id,
    },
    answers: [],
  });
  const createdQuestion = await question.save();

  await User.findByIdAndUpdate(user.id, {
    $push: { myQuestions: createdQuestion._id },
  });

  res.status(201).json(createdQuestion);
});

export { getQuestions, createQuestion };
