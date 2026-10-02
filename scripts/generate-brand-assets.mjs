// Generates favicons and the social share image in public/ from the source logos in src/logos/.
// Run with: npm run brand:assets
import sharp from 'sharp';

const NAVY = '#1c4d8d';
const INK = '#0a1f3d';
const logos = new URL('../src/logos/', import.meta.url);
const pub = new URL('../public/', import.meta.url);

const favicon = new URL('favicon.png', logos).pathname.replace(/^\/(\w:)/, '$1');
const lightWordmark = new URL('Emtek_Logo-transparent-cropped.png', logos).pathname.replace(/^\/(\w:)/, '$1');
const out = (name) => new URL(name, pub).pathname.replace(/^\/(\w:)/, '$1');

// Browser favicons (the round mark keeps its transparent corners)
await sharp(favicon).resize(32, 32).png().toFile(out('favicon-32.png'));
await sharp(favicon).resize(192, 192).png().toFile(out('icon-192.png'));
await sharp(favicon).resize(512, 512).png().toFile(out('icon-512.png'));

// Apple touch icon needs an opaque square background
await sharp({ create: { width: 180, height: 180, channels: 4, background: NAVY } })
  .composite([{ input: await sharp(favicon).resize(150, 150).toBuffer(), gravity: 'centre' }])
  .png()
  .toFile(out('apple-touch-icon.png'));

// Open Graph / social share image, 1200x630
const wordmark = await sharp(lightWordmark).resize({ width: 620 }).toBuffer();
const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="a" cx="0.85" cy="0.1" r="0.7"><stop offset="0" stop-color="#4fa9e0" stop-opacity="0.75"/><stop offset="1" stop-color="#4fa9e0" stop-opacity="0"/></radialGradient>
    <radialGradient id="b" cx="0.1" cy="0.95" r="0.6"><stop offset="0" stop-color="${NAVY}"/><stop offset="1" stop-color="${NAVY}" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${INK}"/>
  <rect width="1200" height="630" fill="url(#b)"/>
  <rect width="1200" height="630" fill="url(#a)"/>
  <text x="600" y="470" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="600" fill="#bde8f5">Turning Complexity Into Clarity</text>
  <text x="600" y="530" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="#bde8f5" fill-opacity="0.75">ERP · Custom Software · Managed IT</text>
</svg>`);
await sharp(background)
  .composite([{ input: wordmark, top: 190, left: 290 }])
  .png({ compressionLevel: 9 })
  .toFile(out('og-image.png'));

// favicon.ico (a single 48px PNG wrapped in an ICO container); many crawlers request it directly
import { writeFileSync } from 'node:fs';
const png48 = await sharp(favicon).resize(48, 48).png().toBuffer();
const ico = Buffer.alloc(22);
ico.writeUInt16LE(0, 0); // reserved
ico.writeUInt16LE(1, 2); // type: icon
ico.writeUInt16LE(1, 4); // image count
ico.writeUInt8(48, 6); // width
ico.writeUInt8(48, 7); // height
ico.writeUInt8(0, 8); // palette
ico.writeUInt8(0, 9); // reserved
ico.writeUInt16LE(1, 10); // colour planes
ico.writeUInt16LE(32, 12); // bits per pixel
ico.writeUInt32LE(png48.length, 14); // image size
ico.writeUInt32LE(22, 18); // image offset
writeFileSync(out('favicon.ico'), Buffer.concat([ico, png48]));

// Web app manifest (install name, icons, colours)
writeFileSync(
  out('site.webmanifest'),
  JSON.stringify(
    {
      name: 'EMTEK',
      short_name: 'EMTEK',
      description: 'ERP, custom software, and managed IT services.',
      start_url: '/',
      display: 'browser',
      background_color: '#ffffff',
      theme_color: '#0a1f3d',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2,
  ) + '\n',
);

console.log('Brand assets written to public/');
