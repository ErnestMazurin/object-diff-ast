import { union, keys, has, isObject, isArray, toObject } from './utils';
import { JSONObject, JSONArray, Node } from './types';

const iter = (obj1: JSONObject, obj2: JSONObject, level: number): Node[] =>
  union(keys(obj1), keys(obj2)).map(key => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (isArray(value1) && isArray(value2)) {
      return { key, level, type: 'unit', unit: 'array', children: iter(toObject(value1), toObject(value2), level + 1) };
    }
    if (isObject(value1) && isObject(value2)) {
      return { key, level, type: 'unit', unit: 'object', children: iter(value1, value2, level + 1) };
    }
    if (has(obj1, key) && !has(obj2, key)) {
      return { key, level, type: 'removed', oldValue: value1 };
    }
    if (!has(obj1, key) && has(obj2, key)) {
      return { key, level, type: 'added', newValue: value2 };
    }
    if (value1 === value2) {
      return { key, level, type: 'unchanged', oldValue: value1 };
    }
    return { key, level, type: 'changed', oldValue: value1, newValue: value2 };
  });

/**
 * Calculates diff tree object
 */
export const getDiff = (before: JSONObject | JSONArray, after: JSONObject | JSONArray) => {
  const obj1 = isArray(before) ? toObject(before) : before;
  const obj2 = isArray(after) ? toObject(after) : after;
  return iter(obj1, obj2, 1);
};
