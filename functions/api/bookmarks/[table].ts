import {
  queryHasuraBookmarkAggregateCount,
  queryHasuraBookmarks,
} from '../../utils/query-hasura';

import { ContextValue } from '../../utils/types';

interface RequestParams {
  env: ContextValue;
  url: string;
  params: ContextValue;
}

export const onRequestGet = async ({ env, url, params }: RequestParams) => {
  const { table } = params;
  const { searchParams } = new URL(url);

  try {
    if (searchParams?.has('countColumn')) {
      const countColumn = searchParams.get('countColumn');
      const bkCountData = await queryHasuraBookmarkAggregateCount(
        env,
        table,
        countColumn as string
      );

      return new Response(JSON.stringify(bkCountData), {
        headers: {
          'Content-Type': 'application/json',
        },
        ok: true,
        status: 200,
      });
    }

    const bkData = await queryHasuraBookmarks(env);

    if (bkData[table]?.length) {
      return new Response(JSON.stringify(bkData[table]), {
        headers: {
          'Content-Type': 'application/json',
        },
        ok: true,
        status: 200,
      });
    }

    return new Response(
      JSON.stringify({
        message: 'No data found',
        params,
        data: bkData,
      }),
      {
        ok: false,
        status: 404,
      }
    );
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
