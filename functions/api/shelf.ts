import { queryHasuraShelf } from '../utils/query-hasura';

import { ContextValue } from '../utils/types';

interface RequestParams {
  env: ContextValue;
}

export const onRequestGet = async ({ env }: RequestParams) => {
  try {
    const shelfData = await queryHasuraShelf(env);
    const noData = Object.keys(shelfData).every(
      table => shelfData[table].length === 0
    );

    console.log('shelf', { shelfData });

    if (!noData) {
      return new Response(JSON.stringify(shelfData), {
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
    console.log('shelf', { error });

    return new Response(error, {
      headers: {
        'Content-Type': 'application/json',
      },
      ok: false,
      status: 500,
    });
  }
};
