export interface PushPost {
  goal_title: string;
  goal_detail: string;
  is_public: boolean;
}

export interface Post {
  id: number;
  user_id: string;
  goal_title: string;
  goal_detail: string;
  is_public: boolean;
  created_at: string;
}