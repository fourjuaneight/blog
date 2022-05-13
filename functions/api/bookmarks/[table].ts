import { queryHasuraBookmarks } from '../../utils/query-hasura';

import { ContextValue } from '../../utils/types';

interface RequestParams {
  env: ContextValue;
  params: ContextValue;
}

export const onRequestGet = async ({
  env,
  params: { table },
}: RequestParams) => {
  try {
    const bkData = await queryHasuraBookmarks(env);

    if (bkData[table].length) {
      return new Response(JSON.stringify(bkData[table]), {
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
