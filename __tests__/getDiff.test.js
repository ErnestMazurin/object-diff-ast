import { getDiff } from '../src';

xtest('first', () => {
  const obj1 = { field: 'true' };
  const obj2 = { field: true };
  const expected = '{\n  + field: true\n  - field: "true"\n}\n';

  const result = getDiff(obj1, obj2);
  expect(result).toBe(expected);
});
