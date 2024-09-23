export interface RegisterUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ILoginUser {
  user: IUser;
  token: string;
}

export interface IUser {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  myQuestions: string[];
  favoriteQuestions: string[];
  likedAnswers: string[];
  dislikedAnswers: string[];
}
