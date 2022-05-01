import { AirtableBKResp, BKValues } from '../../../scripts/types';

interface ContextValue {
  [key: string]: string;
}

interface RequestParams {
  env: ContextValue;
  params: ContextValue;
}

let data: { [key: string]: BKValues[] } = {
  Articles: [],
  Comics: [],
  Podcasts: [],
  Tweets: [],
  Videos: [],
};

const getBookmarksWithOffset = async (
  env: ContextValue,
  table: string,
  offset?: string
): Promise<AirtableBKResp> => {
  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${env.AIRTABLE_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };
  const endpoint = `https://api.airtable.com/v0/${env.AIRTABLE_BOOKMARKS_ID}/${table}`;
  const url = offset ? `${endpoint}?offset=${offset}` : endpoint;

  try {
    return fetch(url, options)
      .then((response: Response) => response.json())
      .then((airtableRes: AirtableBKResp) => {
        const existingData = data[table] || [];
        const newData =
          airtableRes.records?.map(record => {
            delete record.fields.archive;
            return { id: record.id, ...record.fields, dead: false };
          }) || [];

        data[table] = [...existingData, ...newData];

        if (airtableRes.offset) {
          return getBookmarksWithOffset(env, table, airtableRes.offset);
        }

        return airtableRes;
      });
  } catch (error) {
    throw `(getBookmarksWithOffset) - ${error}`;
  }
};

export const onRequestGet = async ({
  env,
  params: { table },
}: RequestParams) => {
  // clean up data
  data[table] = [];

  try {
    await getBookmarksWithOffset(env, table);

    if (data[table].length) {
      return new Response(JSON.stringify(data[table]), {
        headers: {
          'Content-Type': 'application/json',
        },
        ok: true,
        status: 200,
      });
    } else {
      return new Response('Missing data', {
        ok: false,
        status: 500,
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
