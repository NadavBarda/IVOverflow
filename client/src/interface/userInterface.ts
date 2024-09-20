export interface RegisterUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IUser {
  _id: string;
  username: string;
}
