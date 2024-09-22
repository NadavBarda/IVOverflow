import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import { User } from "../models/userModel";
import { generateToken } from "../services/tokenServices";
import {
  comparePassword,
  createUserDb,
  findUser,
  validateLoginInput,
} from "../services/usersServices";

const login = asyncHandler(async (req: Request, res: Response) => {
  const input = validateLoginInput(req, res);
  if (!input) return;

  const { username, password } = input;
  const user = await findUser(username, res);
  if (!user) return;
  const isPasswordValid = await comparePassword(password, user.password, res);
  if (!isPasswordValid) return;

  const token = generateToken(user, res);
  if (!token) return;


  const userData = {
    username: user.username,
    id: user._id.toString(),
  };
  res.status(200).json({ token, user: userData });
});

const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, password, firstName, lastName, email } = req.body;

  if (!username || !password || !firstName || !lastName || !email) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  const duplicate = await User.findOne({ email, username }).exec();
  if (duplicate) {
    res.status(409).json({ message: "User already exists" });
    return;
  }

  const newUser = await createUserDb(req.body);
  res.status(201).json({ user: newUser });
});
export { login, register };
