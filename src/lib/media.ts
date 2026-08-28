import type { ImageMetadata } from 'astro';

const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/media/**/*.{jpeg,jpg,png,webp,avif}',
  { eager: true }
);

export function img(path: string): ImageMetadata {
  const key = path.startsWith('/src') ? path : `/src/assets/media/${path.replace(/^\/+/, '')}`;
  const hit = images[key];
  if (!hit) {
    throw new Error(
      `Image not found: ${key}\nAvailable:\n${Object.keys(images).join('\n')}`
    );
  }
  return hit.default;
}

export const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'film', label: 'Film & Shows' },
  { key: 'advertising', label: 'Advertising' },
  { key: 'personal', label: 'R&D / Personal' }
] as const;

export const CATEGORY_LABEL: Record<string, string> = {
  film: 'Film',
  advertising: 'Advertising',
  personal: 'R&D'
};
