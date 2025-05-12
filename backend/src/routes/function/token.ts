import { Request } from "express";
import supabase from "../../utils/supabase";
import jwt from "jsonwebtoken";

type CreateAccessTokenOptions = {
  identity: string;  // user idなど
  expiresIn?: string | number;  // "1h", 3600 など
  fresh?: boolean;
  additionalClaims?: Record<string, any>;
  additionalHeaders?: Record<string, any>;
};

export function createAccessToken({
  identity,
  expiresIn = "1h",
  fresh = false,
  additionalClaims = {},
  additionalHeaders = {}
}: CreateAccessTokenOptions): string {
  const payload = {
    sub: identity,
    fresh,
    ...additionalClaims,
  };

  return jwt.sign(
  payload,
  process.env.JWT_SECRET as string,
  {
    expiresIn,
    header: {
      typ: "JWT",
      ...additionalHeaders
    }
  } as jwt.SignOptions
);
;

}


const verifyToken = async (req: Request): Promise<string> => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized: Missing token");
  }

  const token = authHeader.split(" ")[1];
  console.log("Token: ", token)

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    throw new Error("Invalid token");
  }

  return data.user.id;
};

export default verifyToken;
