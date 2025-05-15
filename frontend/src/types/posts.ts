export interface PushPost {
  goal_title: string;
  goal_detail: string;
  is_open: boolean;
}

export interface Post {
  id: number;
  user_id: string;
  goal_title: string;
  goal_detail: string;
  is_open: boolean;
  created_at: string;
}