import { RegisterUser } from "../interface/userInterface";
import { axiosPost } from "./axiosConfig";


const login = async (username: string, password: string) => {
  
  const res = await axiosPost("/api/users/login", {
    username,
    password,
  });
  return res.data;
};

const register = async (user: RegisterUser) => {
  const res = await axiosPost("/api/users/register", user);
  return res;
};

export { login, register };
