import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    user: {
      username: { type: String, required: true },
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  },
  { timestamps: true }
);

export const Answer = mongoose.model("Answer", AnswerSchema);
