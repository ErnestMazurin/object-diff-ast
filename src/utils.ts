import { JSONObject, JSONArray, JSONValue, JSONPrimitive } from './types';

export const keys = <T extends Record<string, unknown>>(obj: T): string[] => Object.keys(obj);

export const union = <T>(arr1: T[], arr2: T[]): T[] => {
  const arr = arr1.concat(arr2);
  const set = new Set<T>();
  const result = new Array<T>();
  arr.forEach((value) => {
    if (!set.has(value)) {
      set.add(value);
      result.push(value);
    }
  });
  return result;
};

export const has = <T extends Record<string, unknown>>(obj: T, property: string): boolean =>
  obj.hasOwnProperty(property);

export const isObject = (value: JSONValue): value is JSONObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const isArray = (value: JSONValue): value is JSONArray => Array.isArray(value);

export const isPrimitive = (value: JSONValue): value is JSONPrimitive => !isArray(value) && !isObject(value);

/** Converts array to object (indexes to string keys)*/
export const toObject = (list: JSONArray): JSONObject => {
  const obj = {} as JSONObject;
  list.forEach((value, idx) => {
    obj[String(idx)] = value;
  });
  return obj;
};
