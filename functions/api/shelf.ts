import { queryHasuraShelf } from '../utils/query-hasura';

import {
  AirtableShelfResp,
  ContextValue,
  ShelfItem,
  ShelfRecord,
} from '../../scripts/types';

interface RequestParams {
  env: ContextValue;
}

export const onRequestGet = async ({ env }: RequestParams) => {
  try {
    const shelfData = await queryHasuraShelf(env);
    const noData = Object.keys(shelfData).every(
      table => shelfData[table].length === 0
    );

    if (!noData) {
      return new Response(JSON.stringify(shelfData), {
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
