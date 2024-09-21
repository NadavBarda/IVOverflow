import asyncHandler from "express-async-handler";
import { Question } from "../models/questionModel";
import { User } from "../models/userModel";
import { Request, Response } from "express";

const getQuestions = asyncHandler(async (req: Request, res: Response) => {
  const questions = await Question.find();
  res.status(200).json(questions);
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
  });
  const createdQuestion = await question.save();

  await User.findByIdAndUpdate(user.id, {
    $push: { myQuestions: createdQuestion._id },
  });

  res.status(201).json(createdQuestion);
});

export { getQuestions, createQuestion };
