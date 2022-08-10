import { existsSync, promises } from 'fs';
import { resolve } from 'path';

import chalk from 'chalk';
import fetch from 'isomorphic-fetch';
import sharp from 'sharp';

import { MediaMTG } from '../functions/utils/types';

const { mkdir } = promises;
const dist = resolve(__dirname, '..', 'assets/img/mtg/');
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

    console.info(chalk.green('[MTG-IMG]'), `${name} asset created`);
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
    console.error(chalk.red('[ERROR]'), error);
    process.exit(1);
  }
})();
