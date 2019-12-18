import fs from 'fs';
import path from 'path';
import { union, keys, has, isObject } from 'lodash';
import { render } from './renderers';
import { parse } from './parsers';
import { JSONObject } from './JSONObject';
import { Node } from './Node';

const iter = (obj1: JSONObject, obj2: JSONObject, level: number): Node[] =>
  union(keys(obj1), keys(obj2)).map(key => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (has(obj1, key) && !has(obj2, key)) {
      return { key, level, type: 'removed', oldValue: value1 };
    }
    if (!has(obj1, key) && has(obj2, key)) {
      return { key, level, type: 'added', newValue: value2 };
    }

    if (isObject(value1) && isObject(value2)) {
      return {
        key,
        level,
        type: 'unit',
        children: iter(value1, value2, level + 1),
      };
    }
    if (value1 === value2) {
      return {
        key,
        level,
        type: 'unchanged',
        oldValue: value1,
      };
    }
    return {
      key,
      level,
      type: 'changed',
      oldValue: value1,
      newValue: value2,
    };
  });

const getAST = (config1: JSONObject, config2: JSONObject) => iter(config1, config2, 1);

export const getDiff = (obj1: JSONObject, obj2: JSONObject, format?: string) => render(getAST(obj1, obj2), format);

export const getConfigDiff = (path1: string, path2: string, format?: string) => {
  const fileContent1 = fs.readFileSync(path1).toString();
  const fileContent2 = fs.readFileSync(path2).toString();

  const extension1 = path.extname(path1).slice(1);
  const extension2 = path.extname(path2).slice(1);

  const config1 = parse(fileContent1, extension1);
  const config2 = parse(fileContent2, extension2);

  return getDiff(config1, config2, format);
};
