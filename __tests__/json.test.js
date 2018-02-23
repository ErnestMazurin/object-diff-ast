import fs from 'fs';
import genDiff from '../src';

const expResPath = '__tests__/__fixtures__/expectedResult';
const expectedResult = fs.readFileSync(expResPath).toString();

test('1. flat json', () => {
  expect(genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json', 'json')).toBe(expectedResult);
});

test('2. flat yaml', () => {
  expect(genDiff('__tests__/__fixtures__/before.yaml', '__tests__/__fixtures__/after.yaml', 'yaml')).toBe(expectedResult);
});

test('3. flat ini', () => {
  expect(genDiff('__tests__/__fixtures__/before.ini', '__tests__/__fixtures__/after.ini', 'ini')).toBe(expectedResult);
});
