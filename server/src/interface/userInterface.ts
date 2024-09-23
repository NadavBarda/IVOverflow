import { Document, Types } from "mongoose";
import { IAnswer, IQuestion } from "./questionInterface";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  myQuestions: Types.ObjectId[]
  favoriteQuestions: Types.ObjectId[] 
  likedAnswers: Types.ObjectId[] 
  dislikedAnswers: Types.ObjectId[] 
}
