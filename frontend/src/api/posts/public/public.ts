// import type { User } from "@/types/user";

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT as string;

export const fetchPublicPosts = async () => {
  const response = await fetch(`${ENDPOINT}/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("投稿を取得できませんでした");
  }

  const publicPosts = await response.json();
  return publicPosts;
};
