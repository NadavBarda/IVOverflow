import jwt from "jsonwebtoken";
import { Response } from "express";
import { IUser } from "../interface/userInterface";

function generateToken(user: IUser, res: Response) {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
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
    { expiresIn: "30m" }
  );

  return token;
}
export { generateToken };
