// Bookmarks
export type FieldStatus = 'alive' | 'dead';

export interface ArticleFields {
  archive?: string;
  author: string;
  creator: string;
  dead: boolean;
  id: string;
  site: string;
  tags: string;
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
  tags: string;
  title: string;
  url: string;
}

export interface TweetFields {
  archive?: string;
  creator: string;
  dead: boolean;
  id: string;
  tags: string;
  tweet: string;
  url: string;
}

export interface WebFields {
  archive?: string;
  creator: string;
  dead: boolean;
  id: string;
  tags: string;
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

export interface HasuraShelfQueryResp {
  data: {
    Anime: ShelfItem[];
    Books: ShelfItem[];
    Comics: ShelfItem[];
    Games: ShelfItem[];
    Manga: ShelfItem[];
    Movies: ShelfItem[];
    Shows: ShelfItem[];
    [key: string]: ShelfItem[];
  };
}

export interface HasuraTWQueryResp {
  data: {
    media_tweets: TweetValues[];
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
