import { queryHasuraMTG } from '../utils/query-hasura';

import { ContextValue } from '../utils/types';

interface RequestParams {
  env: ContextValue;
}

export const onRequestGet = async ({ env }: RequestParams) => {
  try {
    const mtgData = await queryHasuraMTG(env);
    const noData = Object.keys(mtgData).every(
      table => mtgData[table].length === 0
    );

    console.log('mtg', { mtgData });

    if (!noData) {
      return new Response(JSON.stringify(mtgData), {
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
    console.log('mtg', { error });

    return new Response(error, {
      headers: {
        'Content-Type': 'application/json',
      },
      ok: false,
      status: 500,
    });
  }
};
