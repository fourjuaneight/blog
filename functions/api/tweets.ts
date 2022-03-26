import { AirtableTweetsResp, TweetFields } from '../../scripts/types';

interface ContextValue {
  [key: string]: string;
}

interface RequestParams {
  env: ContextValue;
}

let data: TweetFields[] = [];

const getTweetsWithOffset = (
  env: ContextValue,
  offset?: string
): Promise<AirtableTweetsResp> => {
  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${env.AIRTABLE_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };
  const endpoint = `https://api.airtable.com/v0/${env.AIRTABLE_MEDIA_ID}/Tweets`;
  const url = offset ? `${endpoint}?offset=${offset}` : endpoint;

  try {
    return fetch(url, options)
      .then((response: Response) => response.json())
      .then((airtableRes: AirtableTweetsResp) => {
        data = [...data, ...airtableRes.records.map(({ fields }) => fields)];

        if (airtableRes.offset) {
          return getTweetsWithOffset(env, airtableRes.offset);
        }

        return airtableRes;
      });
  } catch (error) {
    throw `(getTweetsWithOffset) - ${error}`;
  }
};

export const onRequestGet = async ({ env }: RequestParams) => {
  try {
    await getTweetsWithOffset(env);

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
