export interface RegisterUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginUser {
  username: string;
  password: string;
  id: string;
}
