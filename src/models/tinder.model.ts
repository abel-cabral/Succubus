export interface TinderMatch {
  group_matched: boolean;
  badges: [];
  distance_mi: number;
  content_hash: string;
  common_friends: [];
  common_likes: [];
  common_friend_count: number;
  common_like_count: number;
  connection_count: number;
  _id: string;
  bio: string;
  birth_date: string;
  name: string;
  ping_time: string;
  photos: photos[];
  jobs: job[];
  schools: [];  
  gender: number;
  birth_date_info: string;
  s_number: number;
}

export interface Recs {
  status: number;
  results: TinderMatch[];
}

export interface OnLikeModel {
  status: number;
  match: boolean;
  likes_remaining: number;
  'X-Padding': any;
}

export interface OnPassModel {
  status: number;
  'X-Padding': any;
}

export interface MessageModel {
  from: string;
  message: string;
  sent_date: string;
}

interface photos {
  id: string;
  type: string;
  created_at: string;
  updated_at: string;
  crop_info: {
    user: {
      width_pct: number;
      x_offset_pct: number;
      height_pct: number;
      y_offset_pct: number;
    };
    algo: {
      width_pct: number;
      x_offset_pct: number;
      height_pct: number;
      y_offset_pct: number;
    };
    processed_by_bullseye: boolean;
    user_customized: boolean;
  };
  url: string;
  processedFiles: processedFiles[];
  fileName: string;
  extension: string;
  main: boolean;
}

interface processedFiles {
  url: string;
  height: number;
  width: number;
}

interface job {
  title: {
    displayed: boolean;
    name: string;
  };
}
