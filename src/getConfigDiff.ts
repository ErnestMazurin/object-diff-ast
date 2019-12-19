import fs from 'fs';
import path from 'path';
import { render } from './renderers';
import { parse } from './parsers';
import { getDiff } from './getDiff';

/**
 * Calculates difference between to files. Supported files extensions: .json .ini .yaml
 * @param path1 - path to 'before' file
 * @param path2 - path to 'after' file
 * @param format - one of "plain", "json" or "complex" (default)
 * @throws Error when file format or extension is unsupported
 */
export const getConfigDiff = (path1: string, path2: string, format?: string) => {
  const fileContent1 = fs.readFileSync(path1).toString();
  const fileContent2 = fs.readFileSync(path2).toString();

  const extension1 = path.extname(path1).slice(1);
  const extension2 = path.extname(path2).slice(1);

  const config1 = parse(fileContent1, extension1);
  const config2 = parse(fileContent2, extension2);

  return render(getDiff(config1, config2), format);
};
