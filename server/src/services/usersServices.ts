import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/userModel";
import { IUser } from "../interface/userInterface";

function validateLoginInput(req: Request, res: Response) {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "All fields are required" });
    return null;
  }

  return { username, password };
}

async function findUser(username: string, res: Response) {
  const user = await User.findOne({ username }).exec();
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return null;
  }
  return user;
}

async function comparePassword(
  inputPassword: string,
  userPassword: string,
  res: Response
) {
  const match = await bcrypt.compare(inputPassword, userPassword);
  if (!match) {
    res.status(401).json({ message: "Password is incorrect" });
    return false;
  }
  return true;
}

const createUserDb = async (userData: IUser) => {
  const { username, password, email, firstName, lastName } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    password: hashedPassword,
    email,
    firstName,
    lastName,
    myQuestions: [],
  });
  const newUser = await user.save();
  return newUser;
};

export { validateLoginInput, findUser, comparePassword, createUserDb };
