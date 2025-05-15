import express, { Request, Response } from "express";
import supabase from "../../utils/supabase";
import verifyToken from "../function/token";

const router = express.Router();

// テスト済み
router.get("/mine", async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id = await verifyToken(req);

    const post_id_objs = await getPostId(user_id);
    if (!post_id_objs) {
      res.status(404).json({ error: "No post membership found" });
      return;
    }
    
    const post_ids = post_id_objs.map(p => p.post_id);

    const { data: posts, error } = await supabase
      .from("posts")
      .select("*")
      .in("id", post_ids); // ← 一括で取得

    if (error) {
      res.status(500).json({ error: "Database error" });
      return;
    }

    res.status(200).json(posts);
    
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

async function getPostId(user_id: string) {
    
    const { data: post_ids, error } = await supabase
      .from("post_members")
      .select("post_id")
      .eq("user_id", user_id);

    if (!post_ids || error) {
        console.log("Post_id not found", error)
        return
    } else {
        return post_ids
    }
}

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


router.delete("/:post_id", async (req: Request, res: Response): Promise<void> => {
    const { post_id } = req.params;
        const postIdNum = parseInt(post_id, 10);

    try {
        const user_id = await verifyToken(req);

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