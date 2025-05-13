import type { PushPost, Post } from "@/types/posts";

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT as string;

export const fetchMyPost = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("ログインしていません");
  }

  const response = await fetch(`${ENDPOINT}/posts/mine`, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  });
  // const posts: Post[] = await db.getPostsByUserId(userId); これに変えてみる

  if (!response.ok) {
    throw new Error("投稿の取得に失敗しました");
  }

  const myPost: Post[] = await response.json();
  console.log("mypost: ", myPost)
  return myPost;
};

export const pushMyPosts = async (post: PushPost) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("ログインしていません");
  }

  const response = await fetch(`${ENDPOINT}/posts/mine`, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error("投稿の取得に失敗しました");
  }

  const myDreams = await response.json();
  return myDreams;
};