import { resolve } from 'path';

import chalk from 'chalk';
import glob from 'glob';
import puppeteer from 'puppeteer';
import sharp from 'sharp';
import wait from 'waait';

const globSync = glob.sync;

// glob options
const posts = resolve(__dirname, '..', 'content/posts');
const dist = resolve(__dirname, '..', 'static/og');
const ignore = ['_index.md'];
// posts
const files = globSync('*.md', { cwd: posts, ignore });

const saveSocialImages = async (file: string): Promise<void> => {
  const browser = await puppeteer.launch({
    product: 'chrome',
    headless: true,
  });

  try {
    const page = await browser.newPage();
    const fileName = file.replace('.md', '');

    await page.setViewport({
      width: 1200,
      height: 630,
      deviceScaleFactor: 1.5,
    });
    await page.goto(`https://cleverlaziness.com/social-img/${fileName}.svg`);
    await wait(1000);

    const buffer = await page.screenshot({ type: 'png' });

    // create img and remove svg
    const image = sharp(buffer);

    await image
      .toFormat('jpeg', { progressive: true, quality: 90 })
      .toFile(`${dist}/${fileName}.jpeg`);
  } catch (error) {
    throw `${chalk.red('[ERROR]')} ${chalk.blue(
      '(saveSocialImages)'
    )} ${error}`;
  } finally {
    await browser.close();
  }
};

(async () => {
  try {
    // wait for Cloudflare to finish building the site.
    await wait(300000);

    const ops = files.map(file => saveSocialImages(file));

    await Promise.all(ops);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
