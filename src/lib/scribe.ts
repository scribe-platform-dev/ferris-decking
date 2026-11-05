import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'yaml';

export interface ScribeField {
  name: string;
  type: 'string' | 'text' | 'number' | 'boolean' | 'date' | 'select' | 'rich-text' | 'image';
  label?: string;
  required?: boolean;
  hidden?: boolean;
  isBody?: boolean;
  options?: Array<string | { value: string; label?: string }>;
}

export interface ScribeCollection {
  name: string;
  path: string;
  format?: string;
  label?: string;
  description?: string;
  form?: boolean;
  fields: ScribeField[];
  view?: { primary?: string; sort?: string; fields?: string[] };
  workflow?: { states?: Array<{ name: string; label?: string; kind?: string; hidden?: boolean }> };
}

export interface ScribeSchema {
  site: string;
  siteName?: string;
  turnstileSiteKey?: string;
  umamiWebsiteId?: string;
  umamiScriptUrl?: string;
  contactCollection?: string;
  collections: ScribeCollection[];
}

let cached: ScribeSchema | undefined;

/** Build-time only — reads the repo's own `.scribe.yml`. */
export function loadScribeSchema(): ScribeSchema {
  cached ??= parse(readFileSync(resolve(process.cwd(), '.scribe.yml'), 'utf-8')) as ScribeSchema;
  return cached;
}

export const formCollections = () => loadScribeSchema().collections.filter((c) => c.form === true);
export const contentCollections = () => loadScribeSchema().collections.filter((c) => c.form !== true);
export const collection = (name: string) => loadScribeSchema().collections.find((c) => c.name === name);
