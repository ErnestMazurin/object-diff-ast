# object-diff-ast
🌳 Compares two javascript objects and calculates the difference

[![Maintainability](https://api.codeclimate.com/v1/badges/90853215092db2f4b9f9/maintainability)](https://codeclimate.com/github/ErnestMazurin/object-diff-ast/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/90853215092db2f4b9f9/test_coverage)](https://codeclimate.com/github/ErnestMazurin/object-diff-ast/test_coverage)
[![Build Status](https://travis-ci.org/ErnestMazurin/object-diff-ast.svg?branch=master)](https://travis-ci.org/ErnestMazurin/object-diff-ast)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

---
## How to use
### Install
```shell script
npm i object-diff-ast
```
or
```shell script
yarn add object-diff-ast
```

### Importing
ES6
```js
import { getDiff, render, getConfigDiff } from 'object-diff-ast'
```
ES5
```js
const objDiff = require('object-diff-ast');
```

### Functions

- `getDiff(originalObj, updatedObj)` - returns the difference of original and updated objects as list of AST nodes.
- `render(nodes, format?)` - renders list of AST nodes as formatted string
- `getConfigDiff(path1, path2, format?)` - returns diff of to files as formatted string (nodejs env).
Supported file extensions: .json, .ini or .yaml

Supported formats: "plain", "json" or "complex" (default)

### Usage

#### `getDiff`
Returns list of diff objects (Node) that represents difference of two objects.
```typescript
import { getDiff, JSONObject, Node } from 'object-diff-ast';
const before: JSONObject = {
  field1: 'smth',
  field2: 2,
  field3: true,
  deep: {
    field: {
      k: 'v1',
    },
  },
};

const after: JSONObject = {
  field1: 'smth',
  field2: 3,
  field4: {
    foo: 'bar',
  },
  deep: {
    field: {
      k: 'v2',
    },
  },
};

const diff: Node[] = getDiff(before, after);
console.log(diff);
// output >>>
/*
[
  { key: 'field1', level: 1, type: 'unchanged', oldValue: 'smth' },
  { key: 'field2', level: 1, type: 'changed', oldValue: 2, newValue: 3 },
  { key: 'field3', level: 1, type: 'removed', oldValue: true },
  {
    key: 'deep',
    level: 1,
    type: 'unit',
    unit: 'object',
    children: [
      {
        key: 'field',
        level: 2,
        type: 'unit',
        unit: 'object',
        children: [
          {
            key: 'k',
            level: 3,
            type: 'changed',
            oldValue: 'v1',
            newValue: 'v2',
          },
        ],
      },
    ],
  },
  { key: 'field4', level: 1, type: 'added', newValue: { foo: 'bar' } },
]
*/
```

Or with arrays as field values
```typescript
import { getDiff, JSONObject, Node } from 'object-diff-ast';

const before: JSONObject = {
  field: ['first', 'second'],
};

const after: JSONObject = {
  field: ['first', 'third'],
  newField: [1, 2, 3],
};
const diff: Node[] = getDiff(before, after);
console.log(diff);
// output >>>
/*
[
  {
    key: 'field',
    level: 1,
    type: 'unit',
    unit: 'array',
    children: [
      { key: '0', level: 2, type: 'unchanged', oldValue: 'first' },
      { key: '1', level: 2, type: 'changed', oldValue: 'second', newValue: 'third' },
    ],
  },
  { key: 'newField', level: 1, type: 'added', newValue: [1, 2, 3] },
];
*/
```

#### `render`
Renders calculated diff in different formats.
```typescript
import { getDiff, render, JSONObject } from 'object-diff-ast';

const before: JSONObject = {
  field1: 'smth',
  field2: 2,
  field3: true,
  deep: {
    foo: {
      bar: 'v1',
    },
    list: [1, 2],
  },
};

const after: JSONObject = {
  field1: 'smth',
  field2: 3,
  field4: {
    foo: 'bar',
  },
  deep: {
    foo: {
      bar: 'v2',
    },
    list: [1, 3, 4],
  },
};

const diff = getDiff(before, after);

const complex: string = render(diff); // default format = "complex"
console.log(complex);
// String output >>>
/*
{
    field1: smth
  + field2: 3
  - field2: 2
  - field3: true
    deep: {
        foo: {
          + bar: v2
          - bar: v1
        }
        list: [
            0: 1
          + 1: 3
          - 1: 2
          + 2: 4
        ]
    }
  + field4: {
        foo: bar
    }
}
*/

const plain = render(diff, 'plain');
console.log(plain);
// String output >>>
/*
Property 'field2' was updated. From '2' to '3'
Property 'field3' was removed
Property 'deep.foo.bar' was updated. From 'v1' to 'v2'
Property 'deep.list.1' was updated. From '2' to '3'
Property 'deep.list.2' was added with value '4'
Property 'field4' was added with complex value
*/

const json = render(diff, 'json'); // just the stringified diff object
console.log(json);
// String output >>>
/*
[
  {
    "key": "field1",
    "level": 1,
    "type": "unchanged",
    "oldValue": "smth"
  },
  {
    "key": "field2",
    "level": 1,
    "type": "changed",
    "oldValue": 2,
    "newValue": 3
  },
  {
    "key": "field3",
    "level": 1,
    "type": "removed",
    "oldValue": true
  },
  {
    "key": "deep",
    "level": 1,
    "type": "unit",
    "unit": "object",
    "children": [
      {
        "key": "foo",
        "level": 2,
        "type": "unit",
        "unit": "object",
        "children": [
          {
            "key": "bar",
            "level": 3,
            "type": "changed",
            "oldValue": "v1",
            "newValue": "v2"
          }
        ]
      },
      {
        "key": "list",
        "level": 2,
        "type": "unit",
        "unit": "array",
        "children": [
          {
            "key": "0",
            "level": 3,
            "type": "unchanged",
            "oldValue": 1
          },
          {
            "key": "1",
            "level": 3,
            "type": "changed",
            "oldValue": 2,
            "newValue": 3
          },
          {
            "key": "2",
            "level": 3,
            "type": "added",
            "newValue": 4
          }
        ]
      }
    ]
  },
  {
    "key": "field4",
    "level": 1,
    "type": "added",
    "newValue": {
      "foo": "bar"
    }
  }
]
*/
```

#### `getConfigDiff`
Wrapper over the `render` function. Returns diff of two configuration files as formatted string. (only Nodejs environment)
Support json, ini and yaml file extensions.
```js
import { getConfigDiff } from 'object-diff-ast';

const complexMessage = getConfigDiff('/Users/me/config1.yaml', '/Users/me/config2.yaml');

const plainMessage = getConfigDiff('/Users/me/config1.json', '/Users/me/config2.json', 'plain');

const jsonMessage = getConfigDiff('/Users/me/config1.ini', '/Users/me/config2.ini', 'json');
```

---
## Console app
You also can use this package as nodejs console app.

#### App installation 
```shell script
npm i -g object-diff-ast
```

#### Usage
```shell script
getdiff ./config1.yaml ./config2.yaml
```
or
```shell script
getdiff ./config1.yaml ./config2.yaml -f plain
```




