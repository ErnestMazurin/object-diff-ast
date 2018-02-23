import genDiff from '../src';

test('1. flat json', () => {
  const path1 = '__tests__/__fixtures__/before.json';
  const path2 = '__tests__/__fixtures__/after.json';
  const format = 'json';
  const expectedResult = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  + verbose: true\n}';

  expect(genDiff(path1, path2, format)).toBe(expectedResult);
});

test('2. flat yaml', () => {
  const path1 = '__tests__/__fixtures__/before.yaml';
  const path2 = '__tests__/__fixtures__/after.yaml';
  const format = 'yaml';
  const expectedResult = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  + verbose: true\n}';

  expect(genDiff(path1, path2, format)).toBe(expectedResult);
});
