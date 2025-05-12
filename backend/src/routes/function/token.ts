import { Request } from "express";
import supabase from "../../utils/supabase";

const verifyToken = async (req: Request): Promise<string> => {
  const authHeader = req.headers.authorization;
  
  const token = authHeader
  console.log("Token: ", token)

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    throw new Error("Invalid token");
  }

  return data.user.id;
};

export default verifyToken;
