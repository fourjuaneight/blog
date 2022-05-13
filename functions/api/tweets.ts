import { queryHasuraTweets } from '../utils/query-hasura';

import {
  AirtableTweetsResp,
  ContextValue,
  TweetValues,
} from '../../scripts/types';

interface RequestParams {
  env: ContextValue;
}

export const onRequestGet = async ({ env }: RequestParams) => {
  try {
    const tweets = await queryHasuraTweets(env);

    if (tweets.length) {
      return new Response(JSON.stringify(tweets), {
        headers: {
          'Content-Type': 'application/json',
        },
        ok: true,
        status: 200,
      });
    } else {
      return new Response('No data found', {
        ok: false,
        status: 404,
      });
    }
  } catch (error) {
    return new Response(error, {
      headers: {
        'Content-Type': 'application/json',
      },
      ok: false,
      status: 500,
    });
  }
};
