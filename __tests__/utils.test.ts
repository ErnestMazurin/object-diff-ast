import { JSONObject } from '../src';
import { union, has, isObject, isPrimitive, toObject } from '../src/utils';

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('union', () => {
  it.each([
    [
      [1, 2, 3],
      [3, 4, 1],
      [1, 2, 3, 4],
    ],
    [[1], [1], [1]],
    [[], [1, 2, 3], [1, 2, 3]],
    [[1, 2, 3], [], [1, 2, 3]],
  ])('union(%o, %o)', (arr1, arr2, expected) => {
    expect(union(arr1, arr2)).toEqual(expected);
  });
});

describe('has', () => {
  it.each([
    [{ field1: 'val', field2: 'val' } as any, 'field1', true],
    [{ field1: 'val', field2: 'val' }, 'field3', false],
    [{ field1: { inner: 'val' }, field2: 'val' }, 'field1', true],
    [{ field1: { inner: 'val' }, field2: 'val' }, 'inner', false],
    [{}, 'field', false],
  ])('has(%o, %s)', (obj, prop, expected) => {
    expect(has(obj, prop as string)).toBe(expected as boolean);
  });
});

describe('isObject', () => {
  it.each([
    [{ field: 'val' } as any, true],
    [{}, true],
    [[1, 2, 3], false],
    [3, false],
    ['str', false],
    [true, false],
    [null, false],
  ])('isObject(%o)', (obj, expected) => {
    expect(isObject(obj as JSONObject)).toBe(expected);
  });
});

describe('isPrimitive', () => {
  it.each([
    [1 as any, true],
    ['test', true],
    [true, true],
    [null, true],
    [{ field: 'val' }, false],
    [{}, false],
    [['1', '2'], false],
    [[], false],
  ])('isPrimitive(%s)', (obj, expected) => {
    expect(isPrimitive(obj)).toBe(expected);
  });
});

describe('toObject', () => {
  it.each([
    [['first', 2, true, null, { k: 'v' }] as any, { '0': 'first', '1': 2, '2': true, '3': null, '4': { k: 'v' } }],
    [[[1], []], { '0': [1], '1': [] }],
    [[], {}],
  ])('toObject(%o)', (obj, expected) => {
    expect(toObject(obj)).toEqual(expected);
  });
});
