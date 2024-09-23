import jwt from "jsonwebtoken";
import { Response } from "express";
import { IUser } from "../interface/userInterface";

function generateToken(user: IUser, res: Response) : {token: string, expiresIn: string} | null {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const expiresIn = "30m";
  if (!ACCESS_TOKEN_SECRET) {
    res.status(500).json({ message: "Internal server error" });
    return null;
  }
  const token = jwt.sign(
    {
      user: {
        username: user.username,
        email: user.email,
        id: user.id.toString(),
      },
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn }
  );

  return {token, expiresIn};
}
export { generateToken };
