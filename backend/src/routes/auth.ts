import express from "express";
import jwt from "jsonwebtoken";
import supabase from "../utils/supabase";
import type { Database } from "../types/supabase-schema";

const router = express.Router();

type User = Database["public"]["Tables"]["users"]["Row"]; 

router.post("/login", async (req, res) => {
  const body: { username?: string; password?: string } = req.body;

  if (!body.username || !body.password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const { data, error } = await supabase
  .from("users")
  .select("*")
  .eq("username", body.username)
  .eq("password", body.password)
  .single();

const user = data as User;

  if (error || !user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "24h" });

  res.setHeader("Authorization", `Bearer ${token}`);
  res.status(200).json({ id: user.id, username: user.username });
});

export default router;
