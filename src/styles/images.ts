import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

// list of all images to be used as css resources.
const imageMap = {
  // put your images here
} as Record<string, ImageMetadata>;

export const imageType = (src: string) =>
  Object.entries({
    png: 'image/png',
    webp: 'image/webp',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    tif: 'image/tiff',
  }).reduce((acc, [key, value]) => (src.endsWith(key) ? value : acc), '');

export const imagePath = async (src: ImageMetadata, type = 'webp') => (await getImage({ src, format: type })).src;

export const images = await (async () =>
  (await Promise.all(Object.entries(imageMap).map(async ([key, src]) => [key, await imagePath(src)]))).reduce(
    (acc, [key, path]) => ({ ...acc, [`imgurl-${key}`]: `url(${path})` }),
    {},
  ))();
