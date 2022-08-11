import { existsSync, promises } from 'fs';
import { resolve } from 'path';

import fetch from 'isomorphic-fetch';
import sharp from 'sharp';

import logger from './logger';
import { ShelfItem } from '../functions/utils/types';

const { mkdir } = promises;
const dist = resolve(__dirname, '..', 'assets/img/shelf/');
const variants = ['jpeg', 'webp', 'avif'];

const fmtImage = async (name: string, url: string): Promise<void> => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // map array to promises
  const promises = variants.map(async ext => {
    // image options
    const fileName: string = `${name}.${ext}`;
    const output = `${dist}/${fileName}`;
    const image = sharp(buffer);

    // create variants
    await image
      .toFormat(ext as any, ext === 'jpeg' ? { progressive: true } : undefined)
      .toFile(output);
  });

  try {
    await Promise.all(promises);

    logger.info(`[shelf-images][fmtImage]: ${name} asset created`);
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
    const response = await fetch('https://cleverlaziness.com/api/shelf/', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: { [key: string]: ShelfItem[] } = await response.json();
    const flatData = Object.keys(data)
      .map(key => data[key].map(item => ({ id: item.id, cover: item.cover })))
      .flat();

    if (!existsSync(dist)) await mkdir(dist);

    const ops = flatData.map(asset => fmtImage(asset.id, asset.cover));

    await Promise.all(ops);

    process.exit(0);
  } catch (error) {
    logger.error(`[shelf-images]${error}`);
    process.exit(1);
  }
})();
