interface IUserQuestion {
  _id: string;
  username: string;
}

export interface IQuestion {
  updatedAt?: Date;
  _id?: string;
  title: string;
  body: string;
  user: IUserQuestion;
  tags?: string[];
}
