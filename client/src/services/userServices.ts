import { AxiosResponse } from "axios";
import { RegisterUser } from "../interface/userInterface";
import { axiosPost } from "./axiosConfig";

export interface ErrorList {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

const login = async (
  username: string,
  password: string
): Promise<LoginResponse | null> => {
  try {
    const res: AxiosResponse<LoginResponse> = await axiosPost(
      "/api/users/login",
      { username, password }
    );
    return res.data;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

const validateUser = (
  user: RegisterUser
): { errors: ErrorList; isValid: boolean } => {
  const errors: ErrorList = {};
  if (!user.firstName) errors.firstName = "First name is required.";
  if (!user.lastName) errors.lastName = "Last name is required.";
  if (!user.username) errors.username = "Username is required.";
  if (!user.email) errors.email = "Email is required.";
  if (!user.password) errors.password = "Password is required.";

  if (user.password) {
    const passwordError = passwordValidation(user.password);
    if (passwordError) errors.password = passwordError;
  }

  const isValid = Object.keys(errors).length > 0 ? false : true;

  return { errors, isValid };
};

const passwordValidation = (password: string) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long.`;
  }
  if (!hasUpperCase) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!hasLowerCase) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!hasNumbers) {
    return "Password must contain at least one number.";
  }
  if (!hasSpecialChar) {
    return "Password must contain at least one special character.";
  }

  return null;
};

const register = async (
  user: RegisterUser
): Promise<AxiosResponse<any, any>> => {
  const res = await axiosPost("/api/users/register", user);
  return res;
};

export { login, register, validateUser };
