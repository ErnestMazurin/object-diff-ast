import fs from 'fs';
import { getConfigDiff } from '../src';

const getPath = (name?: string) => `__tests__/__fixtures__/${name}`;

const read = (path?: string) => fs.readFileSync(getPath(path)).toString();

const testSet = [
  ['before.json', 'after.json', undefined, 'expected.complex'],
  ['before.yaml', 'after.yaml', undefined, 'expected.complex'],
  ['before.ini', 'after.ini', undefined, 'expected.complex'],
  ['before.json', 'after.json', 'complex', 'expected.complex'],
  ['before.yaml', 'after.yaml', 'complex', 'expected.complex'],
  ['before.ini', 'after.ini', 'complex', 'expected.complex'],
  ['before.json', 'after.json', 'plain', 'expected.plain'],
  ['before.yaml', 'after.yaml', 'plain', 'expected.plain'],
  ['before.ini', 'after.ini', 'plain', 'expected.plain'],
  ['before.json', 'after.json', 'json', 'expected.json'],
  ['before.yaml', 'after.yaml', 'json', 'expected.json'],
  ['before.ini', 'after.ini', 'json', 'expected.json'],
];

describe('genDiff', () => {
  it.each(testSet)('genDiff(%s, %s, %s)', (name1, name2, format, expectedName) => {
    const expected = read(expectedName);
    expect(getConfigDiff(getPath(name1), getPath(name2), format)).toBe(expected);
  });

  it('should throw error when file not exist', () => {
    expect(() => {
      getConfigDiff(getPath('undefined.json'), getPath('before.json'));
    }).toThrowError();
  });

  it('should throw error when file extension is unknown', () => {
    expect(() => {
      getConfigDiff(getPath('before.unsupported'), getPath('after.unsupported'));
    }).toThrowError();
  });

  it('should throw error when format is unknown', () => {
    expect(() => {
      getConfigDiff(getPath('before.json'), getPath('after.json'), 'newFormat');
    }).toThrowError();
  });
});
