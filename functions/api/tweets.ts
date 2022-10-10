import { queryHasuraTweets } from '../utils/query-hasura';

import { ContextValue } from '../utils/types';

interface RequestParams {
  env: ContextValue;
}

export const onRequestGet = async ({ env }: RequestParams) => {
  try {
    const tweets = await queryHasuraTweets(env);

    console.log('tweets', { shelfData });

    if (tweets.length) {
      return new Response(JSON.stringify(tweets), {
        headers: {
          'Content-Type': 'application/json',
        },
        ok: true,
        status: 200,
      });
    }

    return new Response('No data found', {
      ok: false,
      status: 404,
    });
  } catch (error) {
    console.log('tweets', { error });

    return new Response(error, {
      headers: {
        'Content-Type': 'application/json',
      },
      ok: false,
      status: 500,
    });
  }
};
