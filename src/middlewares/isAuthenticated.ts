import { Request, Response, NextFunction } from "express";
import { Payload } from "../models/auth/Payload";
import { verify } from "jsonwebtoken";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;
    req.userId = sub;
    return next();
  } catch (error) {
    return res.status(401).end();
  }
}
