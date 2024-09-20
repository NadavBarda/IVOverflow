import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  myQuestions: Types.ObjectId[];
}
