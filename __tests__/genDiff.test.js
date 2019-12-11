import fs from 'fs';
import genDiff from '../src';

const getPath = (name) => `__tests__/__fixtures__/${name}`;

const testGenDiff = (path1, path2, expected, format) => {
  expect(genDiff(getPath(path1), getPath(path2), format)).toBe(expected);
};

const read = (path) => fs.readFileSync(getPath(path)).toString();

const testSet1 = [
  ['before.json', 'after.json'],
  ['before.yaml', 'after.yaml'],
  ['before.ini', 'after.ini'],
];

const testSet2 = [
  ['before2.json', 'after2.json'],
  ['before2.yaml', 'after2.yaml'],
  ['before2.ini', 'after2.ini'],
];

describe('Complex output with flat config files', () => {
  const expected = read('expectedResult');
  test.each(testSet1)('genDiff(%s, %s)', (name1, name2) => {
    testGenDiff(name1, name2, expected);
  });
});

describe('Complex output with complex config files', () => {
  const expected = read('expectedResult2');
  test.each(testSet2)('genDiff(%s, %s)', (name1, name2) => {
    testGenDiff(name1, name2, expected);
  });
});

describe('Plain output with flat config files', () => {
  const expected = read('expectedPlainResult');
  test.each(testSet1)('genDiff(%s, %s, \'plain\')', (name1, name2) => {
    testGenDiff(name1, name2, expected, 'plain');
  });
});

describe('Plain output with complex config files', () => {
  const expected = read('expectedPlainResult2');
  test.each(testSet2)('genDiff(%s, %s, \'plain\')', (name1, name2) => {
    testGenDiff(name1, name2, expected, 'plain');
  });
});

describe('JSON output with flat config files', () => {
  const expected = read('expectedJSONResult');
  test.each(testSet1)('genDiff(%s, %s, \'json\')', (name1, name2) => {
    testGenDiff(name1, name2, expected, 'json');
  });
});

describe('JSON output with complex config files', () => {
  const expected = read('expectedJSONResult2');
  test.each(testSet2)('genDiff(%s, %s, \'json\')', (name1, name2) => {
    testGenDiff(name1, name2, expected, 'json');
  });
});
