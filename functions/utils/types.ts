// Bookmarks
export interface ArticleFields {
  archive?: string;
  author: string;
  creator: string;
  dead: boolean;
  id: string;
  site: string;
  tags: string[];
  title: string;
  url: string;
}

export interface RedditFields {
  archive?: string;
  content: string;
  date: string;
  dead: boolean;
  id: string;
  subreddit: string;
  tags: string[];
  title: string;
  url: string;
}

export interface TweetFields {
  archive?: string;
  creator: string;
  dead: boolean;
  id: string;
  tags: string[];
  tweet: string;
  url: string;
}

export interface WebFields {
  archive?: string;
  creator: string;
  dead: boolean;
  id: string;
  tags: string[];
  title: string;
  url: string;
}

export type BKFields = ArticleFields | RedditFields | TweetFields | WebFields;

export interface BookmarksData {
  articles: BKFields[];
  comics: BKFields[];
  podcasts: BKFields[];
  reddits: BKFields[];
  tweets: BKFields[];
  videos: BKFields[];
  [key: string]: BKFields[];
}

export interface RecordColumnAggregateCount {
  [key: string]: number;
}

// MTG
export interface MediaMTG {
  name: string;
  colors: string[] | null;
  type: string | null;
  set: string;
  set_name: string;
  oracle_string: string | null;
  flavor_string: string | null;
  rarity: string;
  collector_number: number;
  artist: string;
  image: string;
  back: string | null;
}

// Shelf
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

// Tweets
export interface TweetValues {
  id?: string;
  tweet: string;
  date: string;
  url: string;
}

// Hasura
export interface HasuraBKQueryResp {
  data: {
    articles: ArticleFields[];
    comics: WebFields[];
    podcasts: WebFields[];
    reddits: RedditFields[];
    tweets: TweetFields[];
    videos: WebFields[];
    [key: string]:
      | ArticleFields[]
      | WebFields[]
      | RedditFields[]
      | TweetFields[];
  };
}

export interface HasuraMTGQueryResp {
  data: {
    media_mtg: MediaMTG[];
  };
}

export interface HasuraShelfQueryResp {
  data: {
    anime: ShelfItem[];
    books: ShelfItem[];
    comics: ShelfItem[];
    games: ShelfItem[];
    manga: ShelfItem[];
    movies: ShelfItem[];
    shows: ShelfItem[];
    [key: string]: ShelfItem[];
  };
}

export interface HasuraTWQueryResp {
  data: {
    media_tweets: TweetValues[];
  };
}

export interface HasuraQueryAggregateResp {
  data: {
    [key: string]: string | string[];
  };
}

export interface HasuraErrors {
  errors: {
    extensions: {
      path: string;
      code: string;
    };
    message: string;
  }[];
}

// Workers
export interface ContextValue {
  [key: string]: string;
}
