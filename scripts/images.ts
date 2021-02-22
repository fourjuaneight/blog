import { resolve } from 'path';
import sharp from 'sharp';

interface VOptions {
  name: string;
  resize: number | number[];
  ext?: string;
}

interface Variants {
  favicon: VOptions[];
}

interface ResizeSizes {
  height?: string;
  width: string;
}

const variants: Variants = {
  favicon: [
    { name: 'favicon', resize: [16, 16] },
    { name: 'favicon', resize: [32, 32] },
    { name: 'icon', resize: [120, 120] },
    { name: 'icon', resize: [180, 180] },
    { name: 'icon', resize: [152, 152] },
    { name: 'icon', resize: [167, 167] },
    { name: 'icon', resize: [256, 256] },
    { name: 'icon', resize: [512, 512] },
  ],
};
const dir = resolve(__dirname, '..', 'public');

/**
 * Create various size and format variants of an image.
 * @function
 *
 * @param {string} src  Image to format and convert
 * @param {string} dest Where to save image
 */
const fmtImage = async (src: string, dest: string): Promise<void> => {
  const input = resolve(__dirname, src);

  // map array to promises
  const promises = variants.favicon.map(async img => {
    // image options
    const sizes = Array.isArray(img.resize)
      ? { height: img.resize[0], width: img.resize[1] }
      : { width: img.resize };
    const type: any = img.ext || 'png';
    const fileName: string = Array.isArray(img.resize)
      ? `${img.name}-${img.resize[0]}x${img.resize[1]}.${type}`
      : `${img.name}.${type}`;
    const output = `${dir}/${dest}/${fileName}`;
    const image = await sharp(input);

    // create variants
    await image
      .resize(sizes)
      .toFormat(type)
      .toFile(output)
      .then(() => {
        console.info(`${fileName} created.`);
      })
      .catch(err => {
        console.error(`Sharp Error:`, { input, output, err });
      });
  });

  // wait until all promises are resolved
  await Promise.all(promises);
};

fmtImage('favicon.png', 'icons');
