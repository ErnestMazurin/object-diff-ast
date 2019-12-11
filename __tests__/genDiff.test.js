import fs from 'fs';
import genDiff from '../src';

describe('Complex output with flat config files', () => {
  const expectedResult = fs.readFileSync('__tests__/__fixtures__/expectedResult').toString();

  test('json', () => {
    expect(genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json')).toBe(expectedResult);
  });

  test('yaml', () => {
    expect(genDiff('__tests__/__fixtures__/before.yaml', '__tests__/__fixtures__/after.yaml')).toBe(expectedResult);
  });

  test('ini', () => {
    expect(genDiff('__tests__/__fixtures__/before.ini', '__tests__/__fixtures__/after.ini')).toBe(expectedResult);
  });
});


describe('Complex output with complex config files', () => {
  const expectedResult2 = fs.readFileSync('__tests__/__fixtures__/expectedResult2').toString();

  test('json', () => {
    expect(genDiff('__tests__/__fixtures__/before2.json', '__tests__/__fixtures__/after2.json', 'complex')).toBe(expectedResult2);
  });

  test('yaml', () => {
    expect(genDiff('__tests__/__fixtures__/before2.yaml', '__tests__/__fixtures__/after2.yaml', 'complex')).toBe(expectedResult2);
  });

  test('ini', () => {
    expect(genDiff('__tests__/__fixtures__/before2.ini', '__tests__/__fixtures__/after2.ini', 'complex')).toBe(expectedResult2);
  });
});

describe('Plain output with flat config files', () => {
  const expectedPlainResult2 = fs.readFileSync('__tests__/__fixtures__/expectedPlainResult').toString();
  test('json', () => {
    expect(genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json', 'plain')).toBe(expectedPlainResult2);
  });

  test('yaml', () => {
    expect(genDiff('__tests__/__fixtures__/before.yaml', '__tests__/__fixtures__/after.yaml', 'plain')).toBe(expectedPlainResult2);
  });

  test('ini', () => {
    expect(genDiff('__tests__/__fixtures__/before.ini', '__tests__/__fixtures__/after.ini', 'plain')).toBe(expectedPlainResult2);
  });
});

describe('Plain output with complex config files', () => {
  const expectedPlainResult2 = fs.readFileSync('__tests__/__fixtures__/expectedPlainResult2').toString();
  test('json', () => {
    expect(genDiff('__tests__/__fixtures__/before2.json', '__tests__/__fixtures__/after2.json', 'plain')).toBe(expectedPlainResult2);
  });

  test('yaml', () => {
    expect(genDiff('__tests__/__fixtures__/before2.yaml', '__tests__/__fixtures__/after2.yaml', 'plain')).toBe(expectedPlainResult2);
  });

  test('ini', () => {
    expect(genDiff('__tests__/__fixtures__/before2.ini', '__tests__/__fixtures__/after2.ini', 'plain')).toBe(expectedPlainResult2);
  });
});

describe('JSON output with flat config files', () => {
  const expectedPlainResult2 = fs.readFileSync('__tests__/__fixtures__/expectedJSONResult').toString();
  test('json', () => {
    expect(genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json', 'json')).toBe(expectedPlainResult2);
  });

  test('yaml', () => {
    expect(genDiff('__tests__/__fixtures__/before.yaml', '__tests__/__fixtures__/after.yaml', 'json')).toBe(expectedPlainResult2);
  });

  test('ini', () => {
    expect(genDiff('__tests__/__fixtures__/before.ini', '__tests__/__fixtures__/after.ini', 'json')).toBe(expectedPlainResult2);
  });
});


describe('JSON output with complex config files', () => {
  const expectedPlainResult2 = fs.readFileSync('__tests__/__fixtures__/expectedJSONResult2').toString();
  test('json', () => {
    expect(genDiff('__tests__/__fixtures__/before2.json', '__tests__/__fixtures__/after2.json', 'json')).toBe(expectedPlainResult2);
  });

  test('yaml', () => {
    expect(genDiff('__tests__/__fixtures__/before2.yaml', '__tests__/__fixtures__/after2.yaml', 'json')).toBe(expectedPlainResult2);
  });

  test('ini', () => {
    expect(genDiff('__tests__/__fixtures__/before2.ini', '__tests__/__fixtures__/after2.ini', 'json')).toBe(expectedPlainResult2);
  });
});
