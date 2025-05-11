import { Request } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET_KEY = process.env.SECRET_KEY!;

const verifyToken = (req: Request): Promise<string> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Promise.reject(new Error("Unauthorized"));
  }

  const token = authHeader.split(" ")[1];

  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded: any) => {
      if (err || !decoded.userId) {
        reject(new Error("Invalid token"));
      } else {
        resolve(decoded.userId); // ここで userId を直接返す
      }
    });
  });
};

export default verifyToken;
