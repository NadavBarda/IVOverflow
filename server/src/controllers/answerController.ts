import { IAnswer } from "../interface/questionInterface";
import asyncHandler from "express-async-handler";
import { Question } from "../models/questionModel";
import { Answer } from "../models/answerModel";
import { Request, Response } from "express";
import { get } from "http";

export const getAnswers = asyncHandler(async (req: Request, res: Response) => {
 
  
  const questionId = req.params.id;
  const answers = await Answer.find({ question: questionId });
  res.status(200).json(answers);
});

const getAnswerById = async (id: string) => {
  const answer = await Answer.findById(id);
  if (!answer) {
    throw new Error("Answer not found");
  }
  return answer;
};

export const likeAnswer = asyncHandler(async (req: Request, res: Response) => {
  const answerId = req.params.id;
  const answer = await getAnswerById(answerId);
  answer.likes += 1;
  await answer.save();
  res.status(200).json(answer);
});

export const dislikeAnswer = asyncHandler(
  async (req: Request, res: Response) => {
    const answerId = req.params.id;
    const answer = await getAnswerById(answerId);
    answer.dislikes += 1;
    await answer.save();
    res.status(200).json(answer);
  }
);

export const createAnswer = asyncHandler(
  async (req: Request, res: Response) => {
    const questionId = req.params.id;
    const { body, user } = req.body;
    const answer = new Answer({
      body,
      user: {
        username: user.username,
        _id: user.id,
      },
      likes: 0,
      dislikes: 0,
      question: questionId,
    });

    await Question.findByIdAndUpdate(questionId, {
      $push: { answers: answer._id },
    });

    await answer.save();
    res.status(200).json(answer);
  }
);
