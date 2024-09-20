import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    myQuestions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }]
});

export default mongoose.model("User", UserSchema);