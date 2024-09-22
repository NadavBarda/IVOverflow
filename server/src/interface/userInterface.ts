import { Document, Types } from "mongoose";
import { IQuestion } from "./questionInterface";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  myQuestions: Types.ObjectId[] | IQuestion[];
}
