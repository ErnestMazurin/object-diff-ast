import yaml from 'js-yaml';
import ini from 'ini';
import { JSONObject } from './types';
import { has } from './utils';

const PARSERS = {
  json: (str: string) => JSON.parse(str),
  yaml: (str: string) => yaml.safeLoad(str),
  ini: (str: string) => ini.parse(str),
} as const;

export const isValidExtension = (format: string): format is Extension => has(PARSERS, format);

export type Extension = keyof typeof PARSERS;

export const parse = (data: string, extension: Extension): JSONObject => PARSERS[extension](data);
