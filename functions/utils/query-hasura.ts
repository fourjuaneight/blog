import {
  ContextValue,
  HasuraBKQueryResp,
  HasuraErrors,
  HasuraShelfQueryResp,
  HasuraTWQueryResp,
  TweetValues,
} from '../../scripts/types';

export const queryHasuraBookmarks = async (env: ContextValue) => {
  const query = `
    {
      Articles: bookmarks_articles(order_by: {title: asc}) {
        archive
        author
        dead
        id
        site
        tags
        title
        url
      }
      Comics: bookmarks_comics(order_by: {title: asc}) {
        archive
        creator
        dead
        id
        tags
        title
        url
      }
      Podcasts: bookmarks_podcasts(order_by: {title: asc}) {
        archive
        creator
        dead
        id
        tags
        title
        url
      }
      Reddits: bookmarks_reddits(order_by: {title: asc}) {
        archive
        content
        dead
        id
        subreddit
        tags
        title
        url
      }
      Tweets: bookmarks_tweets(order_by: {tweet: asc}) {
        dead
        id
        tags
        tweet
        url
        user
      }
      Videos: bookmarks_videos(order_by: {title: asc}) {
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
        `(queryHasuraBookmarks) ${list}: \n ${errors
          .map(err => `${err.extensions.path}: ${err.message}`)
          .join('\n')} \n ${query}`
      );
    }

    return (response as HasuraBKQueryResp).data;
  } catch (error) {
    throw new Error(`(queryHasuraBookmarks) - ${list}: \n ${error}`);
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
        `(queryHasuraShelf) ${list}: \n ${errors
          .map(err => `${err.extensions.path}: ${err.message}`)
          .join('\n')} \n ${query}`
      );
    }

    return (response as HasuraShelfQueryResp).data;
  } catch (error) {
    throw new Error(`(queryHasuraShelf) - ${list}: \n ${error}`);
  }
};

export const queryHasuraTweets = async (env: ContextValue) => {
  const query = `
    {
      media_tweets(order_by: {date: asc}) {
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
        `(queryHasura) ${list}: \n ${errors
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
    throw new Error(`(queryHasura) - ${list}: \n ${error}`);
  }
};