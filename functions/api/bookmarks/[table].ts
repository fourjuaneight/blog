import { queryHasuraBookmarks } from '../../utils/query-hasura';
import { ContextValue } from '../../utils/types';

interface RequestParams {
  env: ContextValue;
  params: ContextValue;
}

export const onRequestGet = async ({ env, params }: RequestParams) => {
  const { table } = params;

  try {
    const bkData = await queryHasuraBookmarks(env);

    console.log('bookmarks/[table]', { table, bkData });

    if (bkData[table]?.length) {
      return new Response(JSON.stringify(bkData[table]), {
        headers: {
          'Content-Type': 'application/json',
        },
        ok: true,
        status: 200,
      });
    } else {
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
    }
  } catch (error) {
    console.log('bookmarks/[table]', { error });

    return new Response(error, {
      headers: {
        'Content-Type': 'application/json',
      },
      ok: false,
      status: 500,
    });
  }
};
