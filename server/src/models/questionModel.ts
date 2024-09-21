import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
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
},
{
  timestamps: true,
});

export const Question = mongoose.model("Question", QuestionSchema);
