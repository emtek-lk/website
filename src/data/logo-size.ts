import type { ImageMetadata } from 'astro';

interface Box {
  /** Target visual area in px², so wide and square logos read as the same weight */
  area: number;
  maxWidth: number;
  maxHeight: number;
}

/**
 * Size a (margin-trimmed) logo by its aspect ratio instead of one fixed height or width.
 * A fixed height shrinks wide logos to a sliver; a fixed width makes square ones huge.
 * Holding the area roughly constant, within a max width and height, gives every logo similar weight.
 */
export function logoSize({ width, height }: ImageMetadata, { area, maxWidth, maxHeight }: Box) {
  const ratio = width / height;
  let w = Math.sqrt(area * ratio);
  let h = w / ratio;
  if (w > maxWidth) {
    w = maxWidth;
    h = w / ratio;
  }
  if (h > maxHeight) {
    h = maxHeight;
    w = h * ratio;
  }
  return { width: Math.round(w), height: Math.round(h) };
}
