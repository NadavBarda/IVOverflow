interface IUserQuestion {
  _id: string;
  username: string;
}

export interface IAnswer {
  _id: string;
  body: string;
  user: IUserQuestion;
  likes: number;
  dislikes: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  questionId: string;
}

export interface IQuestion {
  updatedAt?: Date;
  _id: string;
  title: string;
  body: string;
  user: IUserQuestion;
  tags?: string[];
  answers?: IAnswer[];
}
