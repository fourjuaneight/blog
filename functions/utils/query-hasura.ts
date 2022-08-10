import {
  ContextValue,
  HasuraBKQueryResp,
  HasuraErrors,
  HasuraMTGQueryResp,
  HasuraQueryAggregateResp,
  HasuraShelfQueryResp,
  HasuraTWQueryResp,
  RecordColumnAggregateCount,
  TweetValues,
} from './types';

const countUnique = (iterable: string[]) =>
  iterable.reduce((acc: RecordColumnAggregateCount, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

const countUniqueSorted = (iterable: string[]) =>
  // sort descending by count
  Object.entries(countUnique(iterable))
    .sort((a, b) => b[1] - a[1])
    .reduce(
      (acc: RecordColumnAggregateCount, [key, val]) =>
        ({ ...acc, [key]: val } as RecordColumnAggregateCount),
      {}
    );

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

      throw `(queryHasuraBookmarks):\n${errors
        .map(err => `${err.extensions.path}: ${err.message}`)
        .join('\n')} \n ${query}`;
    }

    return (response as HasuraBKQueryResp).data;
  } catch (error) {
    throw `(queryHasuraBookmarks):\n${error}`;
  }
};

export const queryHasuraBookmarkAggregateCount = async (
  env: ContextValue,
  table: string,
  column: string
): Promise<RecordColumnAggregateCount> => {
  const sort = column === 'tags' ? 'title' : column;
  const query = `
    {
      bookmarks_${table}(order_by: {${sort}: asc}) {
        ${column}
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
    const response: any = await request.json();

    if (response.errors) {
      const { errors } = response as HasuraErrors;

      throw `(queryBookmarkAggregateCount) - ${table}: \n ${errors
        .map(err => `${err.extensions.path}: ${err.message}`)
        .join('\n')} \n ${query}`;
    }

    const data = (response as HasuraQueryAggregateResp).data[
      `bookmarks_${table}`
    ];
    let collection: string[];

    if (column === 'tags') {
      collection = data.map(item => item[column] as string[]).flat();
    } else {
      collection = data.map(item => item[column] as string);
    }

    return countUniqueSorted(collection);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const queryHasuraMTG = async (env: ContextValue) => {
  const query = `
    {
      media_mtg {
        id
        name
        colors
        type
        oracle_text
        flavor_text
        set
        set_name
        rarity
        collector_number
        artist
        image
        back
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
    const response: HasuraMTGQueryResp | HasuraErrors = await request.json();

    if (response.errors) {
      const { errors } = response as HasuraErrors;

      throw `(queryHasuraMTG):\n${errors
        .map(err => `${err.extensions.path}: ${err.message}`)
        .join('\n')} \n ${query}`;
    }

    return (response as HasuraMTGQueryResp).data.media_mtg;
  } catch (error) {
    throw `(queryHasuraMTG):\n${error}`;
  }
};

export const queryHasuraShelf = async (env: ContextValue) => {
  const query = `
    {
      anime: media_shelf(order_by: {name: asc}, where: {category: {_eq: "anime"}}) {
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
      books: media_shelf(order_by: {name: asc}, where: {category: {_eq: "books"}}) {
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
      comics: media_shelf(order_by: {name: asc}, where: {category: {_eq: "comics"}}) {
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
      games: media_shelf(order_by: {name: asc}, where: {category: {_eq: "games"}}) {
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
      manga: media_shelf(order_by: {name: asc}, where: {category: {_eq: "manga"}}) {
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
      movies: media_shelf(order_by: {name: asc}, where: {category: {_eq: "movies"}}) {
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
      shows: media_shelf(order_by: {name: asc}, where: {category: {_eq: "shows"}}) {
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

      throw `(queryHasuraShelf):\n${errors
        .map(err => `${err.extensions.path}: ${err.message}`)
        .join('\n')} \n ${query}`;
    }

    return (response as HasuraShelfQueryResp).data;
  } catch (error) {
    throw `(queryHasuraShelf):\n${error}`;
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

      throw `(queryHasuraTweets):\n${errors
        .map(err => `${err.extensions.path}: ${err.message}`)
        .join('\n')}\n${query}`;
    }

    const tweets = (response as HasuraTWQueryResp).data.media_tweets;
    const tweetsWithId: TweetValues[] = tweets.map(tweet => ({
      ...tweet,
      id: tweet.url.split('/').pop(),
    }));

    return tweetsWithId;
  } catch (error) {
    throw `(queryHasuraTweets):\n${error}`;
  }
};
