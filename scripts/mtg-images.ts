import { existsSync, promises } from 'fs';
import { resolve } from 'path';

import fetch from 'isomorphic-fetch';
import sharp from 'sharp';

import logger from './logger';
import { MediaMTG } from '../functions/utils/types';

const { mkdir } = promises;
const dist = resolve(__dirname, '..', 'assets/img/mtg/');

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
        logger.info(`[mtg-images] [fmtImage]: ${output} created`);
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
    const response = await fetch('https://cleverlaziness.com/api/mtg/', {
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

    const data: MediaMTG[] = await response.json();
    const imgData = data.map(card => ({
      id: card.id,
      image: card.image,
    }));
    const backData = data
      .filter(card => card.back !== null)
      .map(card => ({
        id: card.id,
        back: card.back,
      }));

    if (!existsSync(dist)) await mkdir(dist);

    const imgOps = imgData.map(asset => fmtImage(asset.id, asset.image));
    const backOps = backData.map(asset =>
      fmtImage(asset.id, asset.back as string)
    );

    await Promise.all([...imgOps, ...backOps]);

    process.exit(0);
  } catch (error) {
    logger.error(`[mtg-images] ${error}`);
    process.exit(1);
  }
})();
