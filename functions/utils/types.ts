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
