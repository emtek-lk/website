import type { ImageMetadata } from 'astro';

// Every logo dropped into src/logos/clients/ is picked up automatically.
const files = import.meta.glob<{ default: ImageMetadata }>('../logos/clients/*.{png,webp,svg,jpg,jpeg}', { eager: true });

export interface Client {
  /** File name, used as a stable key */
  file: string;
  /** Display name, derived from the file name */
  name: string;
  logo: ImageMetadata;
}

/** Clients shown first in the logo wall (the featured stories) */
const featuredFirst = ['Vanguard_Protection', 'Smart_Equip', 'Daikin_Air'];

export const clients: Client[] = Object.entries(files)
  .map(([path, mod]) => {
    const file = path.split('/').pop()!;
    return { file, name: file.replace(/\.[^.]+$/, '').replace(/_/g, ' '), logo: mod.default };
  })
  .sort((a, b) => {
    const rank = (c: Client) => {
      const i = featuredFirst.findIndex((f) => c.file.startsWith(f));
      return i === -1 ? 99 : i;
    };
    return rank(a) - rank(b) || a.name.localeCompare(b.name);
  });

export const getClient = (filePrefix: string) => {
  const client = clients.find((c) => c.file.startsWith(filePrefix));
  if (!client) throw new Error(`No client logo starting with "${filePrefix}" in src/logos/clients/`);
  return client;
};
