import { Request } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET_KEY = process.env.SECRET_KEY!;

const verifyToken = (req: Request): Promise<any> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Promise.reject(new Error("Unauthorized")); // ステータスは外側で判断
  }

  const token = authHeader.split(" ")[1];

  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        reject(new Error("Invalid token"));
      } else {
        resolve(decoded); // e.g., { userId: "...", exp: ..., iat: ... }
      }
    });
  });
};

export default verifyToken;
