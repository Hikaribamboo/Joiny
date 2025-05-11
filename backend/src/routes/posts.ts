import express, { Request, Response } from "express";
import supabase from "../utils/supabase";
import verifyToken from "./function/auth";

const router = express.Router();

router.get("/", async (res: Response): Promise<void> => {
    const { data: allPosts, error: findError } = await supabase
        .from("posts")
        .select("*")

    if (findError) {
        res.status(500).json({ error: "Database error" });
        return;
    }

    res.status(201).json(allPosts);
});

router.post("/", async (req: Request, res: Response): Promise<void> => {

    let user_id = ""
    try {
        const decoded = await verifyToken(req);
        user_id = decoded.userId;
        console.log("verified user:", decoded); // ここで userId 使える
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const { goal_title, goal_detail, is_open }: { goal_title?: string; goal_detail?: string; is_open?:boolean } = req.body;

    if (!goal_title || !goal_detail || !is_open) {
        res.status(400).json({ error: "goal_title, goal_detail and is_open are required" });
        return;
    }

    const { data:existingPost, error: findError } = await supabase
        .from("posts")
        .select("user_id")

    if (findError) {
        res.status(500).json({ error: "Database error" });
        return;
    }

    if (existingPost) {
        res.status(409).json({ error: "This user already has goal" });
        return;
    }

    const { data: newPost, error: insertError } = await supabase
        .from("posts")
        .insert([{ user_id, goal_title, goal_detail, is_open }])
        .select()
        .single();

    if (insertError || !newPost) {
        res.status(500).json({ error: "Failed to create post" });
        return;
    }

    res.status(201).json(newPost);  // newPostを返す必要があるのか？
});



export default router;