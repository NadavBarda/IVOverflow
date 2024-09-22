import { Types } from "mongoose";

export interface IUserReference {
  username: string;
  _id: Types.ObjectId;
}

export interface IQuestion {
  title: string;
  body: string;
  tags: string[];
  user: IUserReference;
  answers: Types.ObjectId[] | IAnswer[];
  likes: number;
  dislikes: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAnswer {
  body: string;
  user: {
    username: string;
    _id: Types.ObjectId;
  };
  question: Types.ObjectId; 
  likes: number;
  dislikes: number;
  createdAt?: Date;
  updatedAt?: Date; 
}
