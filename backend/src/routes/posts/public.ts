import express, { Request, Response } from "express";
import supabase from "../../utils/supabase";
import verifyToken from "../function/token";
import { error } from "console";

const router = express.Router();

// テスト済み
router.get("/", async (req:Request, res: Response): Promise<void> => {
    const { data: allPosts, error: findError } = await supabase
        .from("posts")
        .select("*")

    if (findError) {
        res.status(500).json({ error: "Database error" });
        console.log(findError)
        return 
    }

    res.status(200).json(allPosts);
});

// テスト済み
router.post("/", async (req: Request, res: Response): Promise<void> => {
    const user_id = await verifyToken(req);
    if (user_id) {console.log("User Id : ", user_id)}
    const { goal_title, goal_detail, is_open }: { goal_title?: string; goal_detail?: string; is_open?:boolean } = req.body;

    if (!goal_title || !goal_detail || !is_open) {
        res.status(400).json({ error: "goal_title, goal_detail and is_open are required" });
        return;
    }

    // const { error: findError } = await supabase
    //     .from("posts")
    //     .select("user_id")

    // if (findError) {
    //     res.status(500).json({ error: "Database error" });
    //     return;
    // }

    const { data: newPost, error: insertError } = await supabase
        .from("posts")
        .insert({ user_id, goal_title, goal_detail, is_open })
        .select()
        .single();

        console.log(newPost)
    if (insertError || !newPost) {
        console.log(insertError)
        res.status(500).json({ error: "Failed to create post" });
        return;
    }

    res.status(201).json(newPost);  // newPostを返す必要があるのか？
});

export default router;