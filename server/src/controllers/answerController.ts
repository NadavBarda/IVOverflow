import { IAnswer } from "../interface/questionInterface";
import asyncHandler from "express-async-handler";
import { Question } from "../models/questionModel";
import { Answer } from "../models/answerModel";
import { Request, Response } from "express";
import { get } from "http";
import { User } from "../models/userModel";
import mongoose from "mongoose";

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

const isRespondToAnswer = async (
  answerId: string,
  userId: string
): Promise<"like" | "dislike" | ""> => {
  const answerObjectId = new mongoose.Types.ObjectId(answerId);

  const user = await User.findById(userId);
  if (!user) {
    return "";
  }
  if (user.likedAnswers.includes(answerObjectId)) {
    return "like";
  }
  if (user.dislikedAnswers.includes(answerObjectId)) {
    return "dislike";
  }

  return "";
};

const changeAnswerReaction = async (
  answerId: string,
  userId: string,
  newReactionType: "like" | "dislike",
  oldReactionType: "like" | "dislike"
) => {
  const answer = await getAnswerById(answerId);
  
  if (!answer) {
    throw new Error("Answer not found");
  }

  const userRemoveField =
    oldReactionType === "like" ? "likedAnswers" : "dislikedAnswers";

  if (newReactionType === oldReactionType) {
    await User.findByIdAndUpdate(userId, {
      $pull: { [userRemoveField]: answerId },
    });

    if (oldReactionType === "like") {
      answer.likes -= 1;
    } else {
      answer.dislikes -= 1;
    }

  } else {
    const userPushfield =
      newReactionType === "like" ? "likedAnswers" : "dislikedAnswers";

    await User.findByIdAndUpdate(userId, {
      $pull: { [userRemoveField]: answerId },
      $push: { [userPushfield]: answerId },
    });

    if (newReactionType === "like") {
      answer.likes += 1;
      if (oldReactionType === "dislike") {
        answer.dislikes -= 1;
      }
    } else if (newReactionType === "dislike") {
      answer.dislikes += 1;
      if (oldReactionType === "like") {
        answer.likes -= 1;
      }
    }
  }

  await answer.save();
};


const handleAnswerReaction = async (
  req: Request,
  res: Response,
  reactionType: "like" | "dislike"
) => {
  const answerId = req.params.id;
  const userId = req.body.user.id;
  const answer = await getAnswerById(answerId);

  const isRespond = await isRespondToAnswer(answerId, userId);
  if (!answer) {
    return res.status(404).json({ message: "Answer not found" });
  }
  if (isRespond) {
    await changeAnswerReaction(answerId, userId, reactionType, isRespond);
    return res.status(200).json(answer);
  }
  if (reactionType === "like") {
    answer.likes += 1;
  } else {
    answer.dislikes += 1;
  }
  await answer.save();
  const userUpdateField =
    reactionType === "like" ? "likedAnswers" : "dislikedAnswers";
  await User.findByIdAndUpdate(userId, {
    $push: { [userUpdateField]: answerId },
  });
  res.status(200).json(answer);
};

export const likeAnswer = asyncHandler(async (req: Request, res: Response) => {
  await handleAnswerReaction(req, res, "like");
});

export const dislikeAnswer = asyncHandler(
  async (req: Request, res: Response) => {
    await handleAnswerReaction(req, res, "dislike");
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
