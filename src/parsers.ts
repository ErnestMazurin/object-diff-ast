import yaml from 'js-yaml';
import ini from 'ini';
import { JSONObject } from './JSONObject';

const PARSERS_DISPATCHERS = {
  json: (str: string) => JSON.parse(str),
  yaml: (str: string) => yaml.safeLoad(str),
  ini: (str: string) => ini.parse(str),
} as const;

const isValidExtension = (format: string): format is Extension => format in PARSERS_DISPATCHERS;

export type Extension = keyof typeof PARSERS_DISPATCHERS;

export const parse = (data: string, extension: string): JSONObject => {
  if (isValidExtension(extension)) {
    return PARSERS_DISPATCHERS[extension](data);
  }
  throw new Error('Unsupported extension');
};
