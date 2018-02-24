import fs from 'fs';
import genDiff from '../src';

describe('Flat config files', () => {
  const expResPath = '__tests__/__fixtures__/expectedResult';
  const expectedResult = fs.readFileSync(expResPath).toString();

  test('json', () => {
    expect(genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json', 'json')).toBe(expectedResult);
  });

  test('yaml', () => {
    expect(genDiff('__tests__/__fixtures__/before.yaml', '__tests__/__fixtures__/after.yaml', 'yaml')).toBe(expectedResult);
  });

  test('ini', () => {
    expect(genDiff('__tests__/__fixtures__/before.ini', '__tests__/__fixtures__/after.ini', 'ini')).toBe(expectedResult);
  });
});
