import type { User } from "@/types/user";

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT as string;

export const login = async (email: string, password: string) => {
  const response = await fetch(`${ENDPOINT}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("ログインに失敗しました");
  }

  const token = response.headers.get("Authorization");
  if (token === null) {
    throw new Error("JWTを取得できませんでした");
  }
  sessionStorage.setItem("token", token);  // これについて調べる

  const userInfo: User = await response.json();
  return userInfo;
};

// export const loginWithOAuth = async (userId: string) => {
//   const response = await fetch(`${ENDPOINT}/login/oauth`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ userId }),
//   });

//   if (!response.ok) {
//     throw new Error("OAuthログインに失敗しました");
//   }

//   const token = response.headers.get("Authorization");
//   if (token === null) {
//     throw new Error("JWTを取得できませんでした");
//   }
//   sessionStorage.setItem("token", token);

//   return;
// };
