import { getDiff, JSONArray, JSONObject, Node } from '../src';

test('getDiff: common tests', () => {
  const before = {
    unchd: 'val1',
    chd: 'val2',
    rm: 'rem',
    chdArr: [1, 2],
    chdObj: {
      f1: 'val',
      f2: 'val',
      f3: true,
    },
    deep: {
      f1: {
        f2: {
          f3: {
            f4: {
              deepKey: 'foo',
            },
          },
        },
      },
    },
    objArr: [{ item: 'buzz' }],
  };
  const after = {
    unchd: 'val1',
    chd: 3,
    add: '+',
    chdArr: [1, 4],
    newArr: ['first'],
    chdObj: {
      f1: 'val',
      f2: 'newVal',
      f4: true,
    },
    deep: {
      f1: {
        f2: {
          f3: {
            f4: {
              deepKey: 'bar',
            },
          },
        },
      },
    },
    nullField: null,
    objArr: [{ item: 'buzz', n: 'val' }],
  };
  const expected: Node[] = [
    {
      key: 'unchd',
      type: 'unchanged',
      level: 1,
      oldValue: 'val1',
    },
    {
      key: 'chd',
      type: 'changed',
      level: 1,
      oldValue: 'val2',
      newValue: 3,
    },
    {
      key: 'rm',
      type: 'removed',
      level: 1,
      oldValue: 'rem',
    },
    {
      key: 'chdArr',
      type: 'unit',
      unit: 'array',
      level: 1,
      children: [
        {
          key: '0',
          type: 'unchanged',
          level: 2,
          oldValue: 1,
        },
        {
          key: '1',
          type: 'changed',
          level: 2,
          oldValue: 2,
          newValue: 4,
        },
      ],
    },
    {
      key: 'chdObj',
      type: 'unit',
      unit: 'object',
      level: 1,
      children: [
        {
          key: 'f1',
          type: 'unchanged',
          level: 2,
          oldValue: 'val',
        },
        {
          key: 'f2',
          type: 'changed',
          level: 2,
          oldValue: 'val',
          newValue: 'newVal',
        },
        {
          key: 'f3',
          type: 'removed',
          level: 2,
          oldValue: true,
        },
        {
          key: 'f4',
          type: 'added',
          level: 2,
          newValue: true,
        },
      ],
    },
    {
      key: 'deep',
      type: 'unit',
      unit: 'object',
      level: 1,
      children: [
        {
          key: 'f1',
          type: 'unit',
          unit: 'object',
          level: 2,
          children: [
            {
              key: 'f2',
              type: 'unit',
              unit: 'object',
              level: 3,
              children: [
                {
                  key: 'f3',
                  type: 'unit',
                  unit: 'object',
                  level: 4,
                  children: [
                    {
                      key: 'f4',
                      type: 'unit',
                      unit: 'object',
                      level: 5,
                      children: [
                        {
                          key: 'deepKey',
                          type: 'changed',
                          level: 6,
                          oldValue: 'foo',
                          newValue: 'bar',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 'objArr',
      type: 'unit',
      unit: 'array',
      level: 1,
      children: [
        {
          key: '0',
          type: 'unit',
          unit: 'object',
          level: 2,
          children: [
            {
              key: 'item',
              type: 'unchanged',
              level: 3,
              oldValue: 'buzz',
            },
            {
              key: 'n',
              type: 'added',
              level: 3,
              newValue: 'val',
            },
          ],
        },
      ],
    },
    {
      key: 'add',
      type: 'added',
      level: 1,
      newValue: '+',
    },
    {
      key: 'newArr',
      type: 'added',
      level: 1,
      newValue: ['first'],
    },
    {
      key: 'nullField',
      type: 'added',
      level: 1,
      newValue: null,
    },
  ];
  expect(getDiff(before, after)).toEqual(expected);
});

test('two root arrays', () => {
  const before: JSONArray = [
    1,
    2,
    {
      foo: 'bar',
      buzz: {
        field: 'v1',
      },
    },
  ];
  const after: JSONArray = [
    1,
    '3',
    {
      foo: 'bar',
      buzz: {
        field: 'v2',
      },
    },
    'new',
  ];
  const expected: Node[] = [
    {
      key: '0',
      type: 'unchanged',
      level: 1,
      oldValue: 1,
    },
    {
      key: '1',
      type: 'changed',
      level: 1,
      oldValue: 2,
      newValue: '3',
    },
    {
      key: '2',
      type: 'unit',
      unit: 'object',
      level: 1,
      children: [
        { key: 'foo', type: 'unchanged', level: 2, oldValue: 'bar' },
        {
          key: 'buzz',
          type: 'unit',
          unit: 'object',
          level: 2,
          children: [{ key: 'field', type: 'changed', level: 3, oldValue: 'v1', newValue: 'v2' }],
        },
      ],
    },
    {
      key: '3',
      type: 'added',
      level: 1,
      newValue: 'new',
    },
  ];
  expect(getDiff(before, after)).toEqual(expected);
});

test('array and object as roots', () => {
  const before: JSONArray = ['val', 'bar'];
  const after: JSONObject = {
    key: 'val',
    field: { foo: 'bar' },
  };
  const expected: Node[] = [
    { key: '0', type: 'removed', level: 1, oldValue: 'val' },
    { key: '1', type: 'removed', level: 1, oldValue: 'bar' },
    { key: 'key', type: 'added', level: 1, newValue: 'val' },
    { key: 'field', type: 'added', level: 1, newValue: { foo: 'bar' } },
  ];
  expect(getDiff(before, after)).toEqual(expected);
});

test('object and array as roots', () => {
  const before: JSONObject = {
    key: 'val',
    field: { foo: 'bar' },
  };
  const after: JSONArray = ['val', 'bar'];
  const expected: Node[] = [
    { key: 'key', type: 'removed', level: 1, oldValue: 'val' },
    { key: 'field', type: 'removed', level: 1, oldValue: { foo: 'bar' } },
    { key: '0', type: 'added', level: 1, newValue: 'val' },
    { key: '1', type: 'added', level: 1, newValue: 'bar' },
  ];
  expect(getDiff(before, after)).toEqual(expected);
});

describe('empty objects', () => {
  it('both are empty', () => {
    expect(getDiff({}, {})).toEqual([]);
    expect(getDiff([], [])).toEqual([]);
    expect(getDiff({}, [])).toEqual([]);
    expect(getDiff([], {})).toEqual([]);
  });
  it('empty and not empty objects', () => {
    const before = {};
    const after = { foo: ['bar'] };
    const expected: Node[] = [{ key: 'foo', type: 'added', level: 1, newValue: ['bar'] }];
    expect(getDiff(before, after)).toEqual(expected);
  });
  it('not empty and empty objects', () => {
    const before = { foo: ['bar'] };
    const after = {};
    const expected: Node[] = [{ key: 'foo', type: 'removed', level: 1, oldValue: ['bar'] }];
    expect(getDiff(before, after)).toEqual(expected);
  });
  it('empty and not empty arrays', () => {
    const before: JSONArray = [];
    const after = [{ foo: 'bar' }];
    const expected: Node[] = [{ key: '0', type: 'added', level: 1, newValue: { foo: 'bar' } }];
    expect(getDiff(before, after)).toEqual(expected);
  });
  it('not empty and empty arrays', () => {
    const before = [{ foo: 'bar' }];
    const after: JSONArray = [];
    const expected: Node[] = [{ key: '0', type: 'removed', level: 1, oldValue: { foo: 'bar' } }];
    expect(getDiff(before, after)).toEqual(expected);
  });
});
