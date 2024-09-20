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
    user: {
        type: {
            username: {
                type: String,
                required: true
            },
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        },
        required: true // Make sure the user object is required
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const Question = mongoose.model("Question", QuestionSchema);
