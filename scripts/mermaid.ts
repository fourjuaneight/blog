import { exec } from 'child_process';
import { existsSync, promises } from 'fs';
import { promisify } from 'util';
import { resolve } from 'path';

import glob from 'glob';
import { replaceInFile } from 'replace-in-file';

import logger from './logger';

const cwd = resolve(__dirname, '..', 'content/posts');
const dist = resolve(__dirname, '..', 'assets/img/diagrams');
const ignore = ['_index.md'];
const asyncExec = promisify(exec);
const globSync = glob.sync;
const { mkdir, rename } = promises;

export const mmdc = async (input: string, output: string): Promise<void> => {
  try {
    const { stderr, stdout } = await asyncExec(
      `./node_modules/.bin/mmdc -i ${input} -o ${output} -t dark -b transparent`
    );

    if (stderr) {
      throw `[stderr]: ${stderr}`;
    }

    if (stdout) {
      logger.info(`[mermaid] [mmdc]:\n${stdout}`);
    }
  } catch (error) {
    throw `[mmdc] ${error}`;
  }
};

(async () => {
  try {
    // get all markdown files
    const files = globSync('*.md', { cwd, ignore });
    const posts = files.map(file => resolve(cwd, file));
    // render diagrams
    const postOps = posts.map(post => mmdc(post, post));
    await Promise.all(postOps);
    // get all generate svg diagram files
    const imgs = globSync('*.svg', { cwd, ignore });
    // move them to assets/img
    if (!existsSync(dist)) await mkdir(dist);
    const svgOps = imgs.map(img =>
      rename(resolve(cwd, img), resolve(dist, img))
    );
    await Promise.all(svgOps);
    // update markdown files with new svg paths
    await replaceInFile({
      files: posts,
      from: /!\[diagram\]\(\.\/([a-zA-Z0-9-_]+)\.svg\)/g,
      to: '\n![diagram](diagrams/$1.svg)',
    });
  } catch (error) {
    logger.error(`[mermaid] ${error}`);
    process.exit(1);
  }
})();
