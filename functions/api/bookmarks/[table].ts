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
  const endpoint = `https://api.airtable.com/v0/${env.AIRTABLE_BOOKMARKS_ID}/${table}`;
  const url = offset ? `${endpoint}?offset=${offset}` : endpoint;

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
  try {
    await getBookmarksWithOffset(env, params.table);

    if (data.length) {
      const sortedData = data
        .sort((a, b) => {
          if (a.tweet) {
            return a.tweet > b.tweet ? 1 : -1;
          } else {
            return a.title > b.title ? 1 : -1;
          }
        })
        .sort((a, b) => {
          if (a.subreddit) {
            return a.subreddit > b.subreddit ? 1 : -1;
          } else {
            return a.creator > b.creator ? 1 : -1;
          }
        });

      return new Response(JSON.stringify(sortedData), {
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
