import { existsSync, promises } from 'fs';
import { resolve } from 'path';

import fetch from 'isomorphic-fetch';
import sharp from 'sharp';

import logger from './logger';
import { ShelfItem } from '../functions/utils/types';

const { mkdir } = promises;
const dist = resolve(__dirname, '..', 'assets/img/shelf/');

const fmtImage = async (name: string, url: string): Promise<void> => {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName: string = `${name}.png`;
    const output = `${dist}/${fileName}`;

    // create image
    if (!existsSync(output)) {
      const image = sharp(buffer);

      await image.toFile(output).then(() => {
        logger.info(`[shelf-images] [fmtImage]: ${output} created`);
      });
    }
  } catch (err) {
    throw `${JSON.stringify(
      {
        method: 'fmtImage',
        name,
        err,
      },
      undefined,
      2
    )}`;
  }
};

(async () => {
  try {
    const response = await fetch('https://cleverlaziness.xyz/api/shelf/', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // likely due to build failing; done to prevent build failure loop
    if (response.status !== 200) {
      logger.error(`[worker]: ${response.status} - ${response.statusText}`);
      // exit without throwing
      process.exit(0);
    }

    const data: { [key: string]: ShelfItem[] } = await response.json();
    const flatData = Object.keys(data)
      .map(key => data[key].map(item => ({ id: item.id, cover: item.cover })))
      .flat();

    if (!existsSync(dist)) await mkdir(dist);

    const ops = flatData.map(asset => fmtImage(asset.id, asset.cover));

    await Promise.all(ops);

    process.exit(0);
  } catch (error) {
    logger.error(`[shelf-images] ${error}`);
    process.exit(1);
  }
})();
