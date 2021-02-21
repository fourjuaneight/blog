import { resolve } from 'path';
import sharp from 'sharp';

interface Variants {
  name: string;
  size: number;
}

const variants: Variants[] = [
  { name: 'favicon', size: 16 },
  { name: 'favicon', size: 32 },
  { name: 'icon', size: 120 },
  { name: 'icon', size: 180 },
  { name: 'icon', size: 152 },
  { name: 'icon', size: 167 },
  { name: 'icon', size: 256 },
  { name: 'icon', size: 512 },
];
const dir = resolve(__dirname, '..', 'public/icons');

const createIcons = async () => {
  // map array to promises
  const promises = variants.map(async img => {
    const fileName = `${img.name}-${img.size}x${img.size}.png`;

    await sharp('./favicon.png')
      .resize(img.size, img.size)
      .toFile(`${dir}/${fileName}`)
      .then(info => {
        console.info(`${fileName} created.`);
      })
      .catch(err => {
        console.error(`Sharp Error (${fileName}):`, err);
      });
  });

  // wait until all promises are resolved
  await Promise.all(promises);
};

createIcons();
