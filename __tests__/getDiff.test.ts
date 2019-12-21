import { getDiff, Node } from '../src';

test('getDiff', () => {
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
