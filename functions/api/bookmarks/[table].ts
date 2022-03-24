import { AirtableBKResp, BKValues } from '../../../scripts/types';

interface ContextValue {
  [key: string]: string;
}

interface RequestParams {
  env: ContextValue;
  params: ContextValue;
}

let data: BKValues[] = [];

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
  const sortTitle = table === 'Tweets' ? 'tweets' : 'title';
  const sortCreator = table === 'Reddits' ? 'subreddit' : 'creator';
  const endpoint = `https://api.airtable.com/v0/${env.AIRTABLE_BOOKMARKS_ID}/${table}?sort%5B0%5D%5Bfield%5D=${sortTitle}&sort%5B0%5D%5Bdirection%5D=asc&sort%5B1%5D%5Bfield%5D=${sortCreator}&sort%5B1%5D%5Bdirection%5D=asc`;
  const url = offset ? `${endpoint}&offset=${offset}` : endpoint;

  try {
    return fetch(url, options)
      .then((response: Response) => response.json())
      .then((airtableRes: AirtableBKResp) => {
        const existingData = data || [];
        const newData =
          airtableRes.records?.map(record => {
            delete record.fields.archive;
            return { id: record.id, ...record.fields };
          }) || [];

        data = [...existingData, ...newData];

        if (airtableRes.offset) {
          return getBookmarksWithOffset(airtableRes.offset);
        }

        return airtableRes;
      });
  } catch (error) {
    throw `(getBookmarksWithOffset) - ${error}`;
  }
};

export const onRequestGet = async ({ env, params }: RequestParams) => {
  data = [];
 
  try {
    await getBookmarksWithOffset(env, params.table);

    if (data.length) {
      return new Response(JSON.stringify(data), {
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
