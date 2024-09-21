interface IUserQuestion {
  _id: string;
  username: string;
}

interface IAnswer {
  body: string;
  user: IUserQuestion;
  likes: number;
  dislikes: number;
  question: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuestion {
  updatedAt?: Date;
  _id?: string;
  title: string;
  body: string;
  user: IUserQuestion;
  tags?: string[];
  answers?: IAnswer[];
}
