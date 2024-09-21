import mongoose from "mongoose";
import { Answer } from "./answerModel";

const QuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    user: {
      type: {
        username: {
          type: String,
          required: true,
        },
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
      required: true,
    },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Question = mongoose.model("Question", QuestionSchema);
