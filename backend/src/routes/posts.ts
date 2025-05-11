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
    const user_id = await verifyToken(req);

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

router.get("/mine", async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id = await verifyToken(req);

    const { data: posts, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", user_id);

    if (error) {
      res.status(500).json({ error: "Database error" });
      return;
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// GET /posts/:user_id - 特定ユーザーの投稿取得
router.get("/:user_id", async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.params;

    const { data: posts, error } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", user_id);

    if (error) {
        res.status(500).json({ error: "Database error" });
        return;
    }

    res.status(200).json(posts);
});

// DELETE /posts/:post_id - 投稿削除（要認証・作成者のみ）
router.delete("/:post_id", async (req: Request, res: Response): Promise<void> => {
    const { post_id } = req.params;
        const postIdNum = parseInt(post_id, 10);

    try {
        const user_id = await verifyToken(req);

        // 投稿が存在し、かつ作成者かどうかを確認
        const { data: post, error: findError } = await supabase
            .from("posts")
            .select("*")
            .eq("id", postIdNum)
            .maybeSingle();

        if (findError || !post) {
            res.status(404).json({ error: "Post not found" });
            return;
        }

        if (post.user_id !== user_id) {
            res.status(403).json({ error: "Forbidden" });
            return;
        }

        const { error: deleteError } = await supabase
            .from("posts")
            .delete()
            .eq("id", postIdNum);

        if (deleteError) {
            res.status(500).json({ error: "Delete failed" });
            return;
        }

        res.status(204).send();
    } catch (err) {
        res.status(401).json({ error: "Unauthorized" });
    }
});

export default router;