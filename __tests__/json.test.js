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


describe('Complex config files', () => {
  const expResPath2 = '__tests__/__fixtures__/expectedResult2';
  const expectedResult2 = fs.readFileSync(expResPath2).toString();

  test('json', () => {
    expect(genDiff('__tests__/__fixtures__/before2.json', '__tests__/__fixtures__/after2.json', 'json')).toBe(expectedResult2);
  });

  test('yaml', () => {
    expect(genDiff('__tests__/__fixtures__/before2.yaml', '__tests__/__fixtures__/after2.yaml', 'yaml')).toBe(expectedResult2);
  });

  test('ini', () => {
    expect(genDiff('__tests__/__fixtures__/before2.ini', '__tests__/__fixtures__/after2.ini', 'ini')).toBe(expectedResult2);
  });
});
