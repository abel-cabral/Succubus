export interface TinderMatch {
  _id: string;
  badges: [];
  birth_date: string;
  birth_date_info: string;
  connection_count: number;
  common_connections: [];
  interest_count: number;
  common_interests: [];
  distance_mi: number;
  gender: number;
  jobs: job[];
  name: string;
  photos: photos[];
  ping_time: string;
  schools: null;
  teaser: {
    string: string;
  };
  status: number;
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

export interface Recs {
  status: 200;
  results: result[];
}

interface result {
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
  jobs: [];
  schools: [];
  teaser: {
    type: string;
    string: string;
  };
  teasers: [];
  gender: number;
  birth_date_info: string;
  s_number: number;
  spotify_theme_track: {
    id: string;
    name: string;
    album: {
      id: string;
      name: string;
      images: processedFiles[];
    };
    artists: [];
    preview_url: string;
    uri: string;
  };
  rank: number;
  score: number;
}
