import express, { Request, Response } from "express";
import supabase from "../utils/supabase";

const router = express.Router();

// テスト済み
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { email, password }: { email?: string; password?: string } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "email and password are required" });
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({"email": email, "password": password});
  console.log(data)
  if (error || !data.session?.access_token) {
    res.status(401).json({ error: "Invalid credentials" });
    console.log(error)
    return;
  }

  const access_token = data.session.access_token;

  res.setHeader("Authorization", `Bearer ${access_token}`);
  res.status(200).json({ id: data.user.id, email: data.user.email });
});

// テスト済み
router.post("/signup", async (req: Request, res: Response): Promise<void> => {
  const { email, password, username }: { email?: string; password?: string; username?:string } = req.body;

  if (!email || !password || !username) {
    res.status(400).json({ error: "email, username and password are required" });
    return;
  }

  const { data: existingUsers, error: findError } = await supabase.from("users").select("*").eq("email", email);
  
  if (findError) {
    res.status(500).json({ error: "Failed to check existing users" });
    return;
  }

  if (existingUsers && existingUsers.length > 0) {
    res.status(409).json({ error: "Email is already taken" });
    return;
  }

  const { data: signUpData, error: resisterError } = await supabase.auth.signUp({
      "email": email,
      "password": password,
      options: {
        data: {
          username: username
        }
      }
  });

  if (resisterError || !signUpData?.user) {
    console.error("Signup Error:", resisterError);
    res.status(500).json({ error: "Failed to register user" });
    return;
  }

  res.status(201).json({
    message: "Signup successful. Please log in.",
    user: {
      id: signUpData.user.id,
      email: signUpData.user.email,
      username
    }
  });
});

export default router;
