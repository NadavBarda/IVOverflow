import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";

// Define an extended Request type to include user in the request
interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

const validateToken = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];

      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err, decoded) => {
          if (err) {
            res.status(401).json({ message: "Unauthorized" });
          }
          const decode = decoded as JwtPayload;
          req.body.user = decode.user;
          next();
        }
      );
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
);

export default validateToken;
