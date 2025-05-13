import { Request } from "express";
import supabase from "../../utils/supabase";

const verifyToken = async (req: Request): Promise<string> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Authorization header missing");
  }
  
  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
    throw new Error("Invalid Authorization header format");
  }

  const token = parts[1];

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    throw new Error("Invalid token");
  }

  return data.user.id;
};

export default verifyToken;
