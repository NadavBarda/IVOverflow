import jwt from "jsonwebtoken";
import { Response } from "express";
import { Types } from "mongoose";

interface TokenUser {
  username: string;
  email: string;
  _id: Types.ObjectId;
}

function generateToken(user: TokenUser, res: Response): string | null {
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
        id: user._id.toString(),
      },
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );

  return token;
}

export { generateToken };
