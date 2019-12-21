import { render, Node } from '../src';

const diffObject: Node[] = [
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
  {
    key: 'deepObj',
    type: 'unit',
    unit: 'object',
    level: 1,
    children: [
      {
        key: 'field',
        type: 'unit',
        unit: 'object',
        level: 2,
        children: [
          {
            key: 'field1',
            type: 'added',
            level: 3,
            newValue: 10,
          },
          {
            key: 'field2',
            type: 'removed',
            level: 3,
            oldValue: [1, 2, 3],
          },
        ],
      },
      {
        key: 'newObj',
        type: 'added',
        level: 2,
        newValue: {
          foo: {
            bar: 'val',
          },
        },
      },
      {
        key: 'obj',
        type: 'unchanged',
        level: 2,
        oldValue: {
          foo: {
            bar: 'val',
          },
        },
      },
      {
        key: 'arr',
        type: 'unchanged',
        level: 2,
        oldValue: [],
      },
      {
        key: 'arr2',
        type: 'unchanged',
        level: 2,
        oldValue: [
          {
            key1: 'val1',
            key2: 'val2',
          },
          {
            key1: 'val3',
            key5: 'val5',
          },
        ],
      },
      {
        key: 'chArr',
        type: 'unit',
        unit: 'array',
        level: 2,
        children: [
          {
            key: '0',
            type: 'unchanged',
            level: 3,
            oldValue: 10,
          },
          {
            key: '1',
            type: 'changed',
            level: 3,
            oldValue: 11,
            newValue: [],
          },
          {
            key: '2',
            type: 'added',
            level: 3,
            newValue: [],
          },
        ],
      },
      {
        key: 'emptyObj',
        type: 'added',
        level: 2,
        newValue: {},
      },
    ],
  },
];

test('complex renderer', () => {
  const expected = `{
    unchd: val1
  + chd: 3
  - chd: val2
  - rm: rem
    chdArr: [
        0: 1
      + 1: 4
      - 1: 2
    ]
    chdObj: {
        f1: val
      + f2: newVal
      - f2: val
      - f3: true
      + f4: true
    }
  + add: +
  + newArr: [
        0: first
    ]
  + nullField: null
    deepObj: {
        field: {
          + field1: 10
          - field2: [
                0: 1
                1: 2
                2: 3
            ]
        }
      + newObj: {
            foo: {
                bar: val
            }
        }
        obj: {
            foo: {
                bar: val
            }
        }
        arr: []
        arr2: [
            0: {
                key1: val1
                key2: val2
            }
            1: {
                key1: val3
                key5: val5
            }
        ]
        chArr: [
            0: 10
          + 1: []
          - 1: 11
          + 2: []
        ]
      + emptyObj: {}
    }
}
`;
  expect(render(diffObject)).toEqual(expected);
});

test('plain renderer', () => {
  const expected = `Property 'chd' was updated. From 'val2' to '3'
Property 'rm' was removed
Property 'chdArr.1' was updated. From '2' to '4'
Property 'chdObj.f2' was updated. From 'val' to 'newVal'
Property 'chdObj.f3' was removed
Property 'chdObj.f4' was added with value 'true'
Property 'add' was added with value '+'
Property 'newArr' was added with complex value
Property 'nullField' was added with value 'null'
Property 'deepObj.field.field1' was added with value '10'
Property 'deepObj.field.field2' was removed
Property 'deepObj.newObj' was added with complex value
Property 'deepObj.chArr.1' was updated. From '11' to complex value
Property 'deepObj.chArr.2' was added with complex value
Property 'deepObj.emptyObj' was added with complex value
`;
  expect(render(diffObject, 'plain')).toEqual(expected);
});

test('should throw an error', () => {
  expect(() => {
    render(diffObject, 'poem');
  }).toThrowError();
});
