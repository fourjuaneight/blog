// Bookmarks
export interface RedditFields {
  archive?: string;
  content: string;
  date: string;
  subreddit: string;
  tags: string[];
  title: string;
  url: string;
}

export interface TweetFields {
  archive?: string;
  creator: string;
  tweet: string;
  url: string;
  tags: string[];
}

export interface WebFields {
  archive?: string;
  creator: string;
  title: string;
  url: string;
  tags: string[];
}

export type BKFields = RedditFields | TweetFields | WebFields;

export interface BKRecord {
  id: string;
  fields: BKFields;
  createdTime: string;
}

export interface AirtableBKResp {
  records: BKRecord[];
  offset: string;
}

export type BKValues = BKFields & { id: string };

export interface BookmarksData {
  Articles: BKValues[];
  Comics: BKValues[];
  Podcasts: BKValues[];
  Reddits: BKValues[];
  Tweets: BKValues[];
  Videos: BKValues[];
  [key: string]: BKValues[];
}

// Shelf
export interface ShelfFields {
  name: string;
  creator: string;
  rating: number;
  cover: {
    id: string;
    width: number;
    height: number;
    url: string;
    filename: string;
    size: number;
    type: string;
    thumbnails: {
      small: {
        url: string;
        width: number;
        height: number;
      };
      large: {
        url: string;
        width: number;
        height: number;
      };
      full: {
        url: string;
        width: number;
        height: number;
      };
    };
  }[];
  category: string;
  genre: string;
  completed?: boolean;
  comments: string;
}

export interface ShelfRecord {
  id: string;
  fields: ShelfFields;
  createdTime: string;
}

export interface AirtableShelfResp {
  records: ShelfRecord[];
  offset: string;
}

export interface ShelfItem {
  id: string;
  name: string;
  creator: string;
  rating: number;
  cover: string;
  category: string;
  genre: string;
  completed: boolean;
  comments: string;
}
