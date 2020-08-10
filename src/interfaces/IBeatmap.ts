export interface Beatmap {
  approved: number;
  submit_date: Date;
  approved_date: Date;
  last_update: Date;
  artist: string;
  beatmap_id: number;
  beatmapset_id: number;
  bpm: number;
  creator: string;
  creator_id: number;
  difficultyrating: number;
  diff_aim: number;
  diff_speed: number;
  diff_size: number;
  diff_overall: number;
  diff_approach: number;
  diff_drain: number;
  hit_length: number;
  source: string;
  genre_id: number;
  language_id: number;
  title: string;
  total_length: number;
  version: string;
  file_md5: string;
  mode: number;
  tags: string;
  favourite_count: number;
  rating: number;
  playcount: number;
  passcount: number;
  count_normal: number;
  count_slider: number;
  count_spinner: number;
  max_combo: number;
  storyboard: number;
  video: number;
  download_unavailable: number;
  audio_unavailable: number;
}

export interface BeatmapSet {
  beatmapset_id: number;
  low_diff: number;
  high_diff: number;
  beatmaps: Beatmap[];
}
