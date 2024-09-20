import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import {
  comparePassword,
  findUser,
  validateLoginInput,
} from "../services/loginServices.js";
import { generateToken } from "../services/tokenServices.js";

const login = asyncHandler(async (req: Request, res: Response) => {
  const input = validateLoginInput(req, res);
  if (!input) return;

  const { username, password } = input;

  // Find user
  const user = await findUser(username, res);
  if (!user) return;

  // Compare password
  const isPasswordValid = await comparePassword(password, user.password, res);
  if (!isPasswordValid) return;

  const token = generateToken(user, res);

  if (!token) return;

  // Send response
  res.status(200).json({ token, user });
});

export { login };
