import fs from 'fs';
import { getConfigDiff } from '../src';

const getPath = (name?: string) => `__tests__/__fixtures__/${name}`;

const read = (path?: string) => fs.readFileSync(getPath(path)).toString();

describe('genDiff', () => {
  it.each([
    ['before.json', 'after.json', 'expected.json', 'json'],
    ['before.yaml', 'after.yaml', 'expected.json', 'json'],
    ['before.ini', 'after.ini', 'expected.json', 'json'],
  ])('genDiff(%s, %s, %s)', (name1, name2, expectedName, format) => {
    const expected = read(expectedName);
    expect(getConfigDiff(getPath(name1), getPath(name2), format)).toBe(expected);
  });

  it.each([
    ['undefined.json', 'after.json', 'complex'],
    ['before.unsupported', 'after.unsupported', 'complex'],
    ['before.json', 'after.json', 'undefined'],
  ])('genDiff(%s, $s, %s) should throw error', (name1, name2, format) => {
    expect(() => {
      getConfigDiff(getPath(name1), getPath(name2), format);
    }).toThrowError();
  });
});
