import {
  ContextValue,
  HasuraBKQueryResp,
  HasuraErrors,
  HasuraShelfQueryResp,
  HasuraTWQueryResp,
  TweetValues,
} from './types';

export const queryHasuraBookmarks = async (env: ContextValue) => {
  const query = `
    {
      articles: bookmarks_articles(order_by: {title: asc}) {
        archive
        author
        dead
        id
        site
        tags
        title
        url
      }
      comics: bookmarks_comics(order_by: {title: asc}) {
        archive
        creator
        dead
        id
        tags
        title
        url
      }
      podcasts: bookmarks_podcasts(order_by: {title: asc}) {
        archive
        creator
        dead
        id
        tags
        title
        url
      }
      reddits: bookmarks_reddits(order_by: {title: asc}) {
        archive
        content
        dead
        id
        subreddit
        tags
        title
        url
      }
      tweets: bookmarks_tweets(order_by: {tweet: asc}) {
        dead
        id
        tags
        tweet
        url
        user
      }
      videos: bookmarks_videos(order_by: {title: asc}) {
        archive
        creator
        dead
        id
        tags
        title
        url
      }
    }
  `;

  try {
    const request = await fetch(`${env.HASURA_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Admin-Secret': `${env.HASURA_ADMIN_SECRET}`,
      },
      body: JSON.stringify({ query }),
    });
    const response: HasuraBKQueryResp | HasuraErrors = await request.json();

    if (response.errors) {
      const { errors } = response as HasuraErrors;

      throw new Error(
        `(queryHasuraBookmarks): \n ${errors
          .map(err => `${err.extensions.path}: ${err.message}`)
          .join('\n')} \n ${query}`
      );
    }

    return (response as HasuraBKQueryResp).data;
  } catch (error) {
    throw new Error(`(queryHasuraBookmarks): \n ${error}`);
  }
};

export const queryHasuraShelf = async (env: ContextValue) => {
  const query = `
    {
      Anime: media_shelf(order_by: {name: asc}, where: {category: {_eq: "Anime"}}) {
        category
        comments
        completed
        cover
        creator
        genre
        id
        name
        rating
      }
      Books: media_shelf(order_by: {name: asc}, where: {category: {_eq: "Books"}}) {
        category
        comments
        completed
        cover
        creator
        genre
        id
        name
        rating
      }
      Comics: media_shelf(order_by: {name: asc}, where: {category: {_eq: "Comics"}}) {
        category
        comments
        completed
        cover
        creator
        genre
        id
        name
        rating
      }
      Games: media_shelf(order_by: {name: asc}, where: {category: {_eq: "Games"}}) {
        category
        comments
        completed
        cover
        creator
        genre
        id
        name
        rating
      }
      Manga: media_shelf(order_by: {name: asc}, where: {category: {_eq: "Manga"}}) {
        category
        comments
        completed
        cover
        creator
        genre
        id
        name
        rating
      }
      Movies: media_shelf(order_by: {name: asc}, where: {category: {_eq: "Movies"}}) {
        category
        comments
        completed
        cover
        creator
        genre
        id
        name
        rating
      }
      Shows: media_shelf(order_by: {name: asc}, where: {category: {_eq: "Shows"}}) {
        category
        comments
        completed
        cover
        creator
        genre
        id
        name
        rating
      }
    }
  `;

  try {
    const request = await fetch(`${env.HASURA_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Admin-Secret': `${env.HASURA_ADMIN_SECRET}`,
      },
      body: JSON.stringify({ query }),
    });
    const response: HasuraShelfQueryResp | HasuraErrors = await request.json();

    if (response.errors) {
      const { errors } = response as HasuraErrors;

      throw new Error(
        `(queryHasuraShelf): \n ${errors
          .map(err => `${err.extensions.path}: ${err.message}`)
          .join('\n')} \n ${query}`
      );
    }

    return (response as HasuraShelfQueryResp).data;
  } catch (error) {
    throw new Error(`(queryHasuraShelf): \n ${error}`);
  }
};

export const queryHasuraTweets = async (env: ContextValue) => {
  const query = `
    {
      media_tweets(order_by: {date: desc}) {
        date
        tweet
        url
      }
    }
  `;

  try {
    const request = await fetch(`${env.HASURA_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Admin-Secret': `${env.HASURA_ADMIN_SECRET}`,
      },
      body: JSON.stringify({ query }),
    });
    const response: HasuraTWQueryResp | HasuraErrors = await request.json();

    if (response.errors) {
      const { errors } = response as HasuraErrors;

      throw new Error(
        `(queryHasuraTweets): \n ${errors
          .map(err => `${err.extensions.path}: ${err.message}`)
          .join('\n')} \n ${query}`
      );
    }

    const tweets = (response as HasuraTWQueryResp).data.media_tweets;
    const tweetsWithId: TweetValues[] = tweets.map(tweet => ({
      ...tweet,
      id: tweet.url.split('/').pop(),
    }));

    return tweetsWithId;
  } catch (error) {
    throw new Error(`(queryHasuraTweets): \n ${error}`);
  }
};
