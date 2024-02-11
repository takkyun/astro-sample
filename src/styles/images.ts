import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

import imageFooterBlue from '../assets/footer-blue.png';
import imageFooterGreen from '../assets/footer-green.png';
import imageHeaderBlue from '../assets/header-blue.png';
import imageHeaderGreen from '../assets/header-green.png';

// list of all images to be used as css resources.
const imageMap = {
  header_desktop: imageHeaderBlue,
  header_mobile: imageHeaderGreen,
  footer_desktop: imageFooterBlue,
  footer_mobile: imageFooterGreen,
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
    (acc, [key, path]) => ({ ...acc, [`imgurl-${key.replace(/_/g, '-')}`]: `url(${path})` }),
    {},
  ))();
