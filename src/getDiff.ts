import { union, keys, has, isObject } from './utils';
import { JSONObject, Node } from './types';

const unionKeys = <T>(obj1: T, obj2: T) => union(keys(obj1), keys(obj2));

const iter = (obj1: JSONObject, obj2: JSONObject, level: number): Node[] =>
  unionKeys(obj1, obj2).map(key => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (has(obj1, key) && !has(obj2, key)) {
      return { key, level, type: 'removed', oldValue: value1 };
    }
    if (!has(obj1, key) && has(obj2, key)) {
      return { key, level, type: 'added', newValue: value2 };
    }
    if (isObject(value1) && isObject(value2)) {
      return { key, level, type: 'unit', children: iter(value1, value2, level + 1) };
    }
    if (value1 === value2) {
      return { key, level, type: 'unchanged', oldValue: value1 };
    }
    return { key, level, type: 'changed', oldValue: value1, newValue: value2 };
  });

/**
 * Calculates diff tree object
 */
export const getDiff = (obj1: JSONObject, obj2: JSONObject) => iter(obj1, obj2, 1);
