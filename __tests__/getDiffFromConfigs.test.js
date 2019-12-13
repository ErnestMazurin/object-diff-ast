import fs from 'fs';
import { getConfigDiff } from '../src';

const getPath = (name) => `__tests__/__fixtures__/${name}`;

const read = (path) => fs.readFileSync(getPath(path)).toString();

const testSet = [
  // Complex output with flat config files
  ['before.json', 'after.json', undefined, 'expectedResult'],
  ['before.yaml', 'after.yaml', undefined, 'expectedResult'],
  ['before.ini', 'after.ini', undefined, 'expectedResult'],
  // Complex output with complex config files
  ['before2.json', 'after2.json', undefined, 'expectedResult2'],
  ['before2.yaml', 'after2.yaml', undefined, 'expectedResult2'],
  ['before2.ini', 'after2.ini', undefined, 'expectedResult2'],
  // Plain output with flat config files
  ['before.json', 'after.json', 'plain', 'expectedPlainResult'],
  ['before.yaml', 'after.yaml', 'plain', 'expectedPlainResult'],
  ['before.ini', 'after.ini', 'plain', 'expectedPlainResult'],
  // Plain output with complex config files
  ['before2.json', 'after2.json', 'plain', 'expectedPlainResult2'],
  ['before2.yaml', 'after2.yaml', 'plain', 'expectedPlainResult2'],
  ['before2.ini', 'after2.ini', 'plain', 'expectedPlainResult2'],
  // JSON output with flat config files
  ['before.json', 'after.json', 'json', 'expectedJSONResult'],
  ['before.yaml', 'after.yaml', 'json', 'expectedJSONResult'],
  ['before.ini', 'after.ini', 'json', 'expectedJSONResult'],
  // JSON output with complex config files
  ['before2.json', 'after2.json', 'json', 'expectedJSONResult2'],
  ['before2.yaml', 'after2.yaml', 'json', 'expectedJSONResult2'],
  ['before2.ini', 'after2.ini', 'json', 'expectedJSONResult2'],
];

describe('genDiff', () => {
  test.each(testSet)('genDiff(%s, %s, %s)', (name1, name2, format, expectedName) => {
    const expected = read(expectedName);
    expect(getConfigDiff(getPath(name1), getPath(name2), format)).toBe(expected);
  });
});
