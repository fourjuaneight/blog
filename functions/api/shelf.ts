import { AirtableShelfResp, ShelfRecord } from '../../scripts/types';

interface ContextValue {
  [key: string]: string;
}

interface RequestParams {
  env: ContextValue;
}

let data: ShelfRecord[] = [];

const getShelfWithOffset = (
  env: ContextValue,
  offset?: string
): Promise<AirtableShelfResp> => {
  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${env.AIRTABLE_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };
  const endpoint = `https://api.airtable.com/v0/${env.AIRTABLE_MEDIA_ID}/Shelf`;
  const url = offset ? `${endpoint}?offset=${offset}` : endpoint;

  try {
    return fetch(url, options)
      .then((response: Response) => response.json())
      .then((airtableRes: AirtableShelfResp) => {
        data = [...data, ...airtableRes.records];

        if (airtableRes.offset) {
          return getShelfWithOffset(env, airtableRes.offset);
        }

        return airtableRes;
      });
  } catch (error) {
    throw `(getShelfWithOffset) - ${error}`;
  }
};

export const onRequestGet = async ({ env }: RequestParams) => {
  try {
    await getShelfWithOffset(env);

    if (data.length) {
      const cleanData: ShelfItem[] = data
        .map((item: ShelfRecord) => ({
          id: item.id,
          ...item.fields,
          cover: item.fields.cover[0].url,
          completed: item.fields.completed || false,
        }))
        .sort((a: ShelfItem, b: ShelfItem) => a.name.localeCompare(b.name));
      const groupedData: { [key: string]: ShelfItem[] } = cleanData.reduce(
        (acc: { [key: string]: ShelfItem[] }, item: ShelfItem) => {
          const key = item.category;

          if (!acc[key]) {
            acc[key] = [];
          }

          acc[key].push(item);

          return acc;
        },
        {}
      );

      return new Response(JSON.stringify(groupedData), {
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
