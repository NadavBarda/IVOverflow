import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const Question = mongoose.model("Question", QuestionSchema);
