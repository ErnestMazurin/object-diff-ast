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
```js
import { getDiff } from 'object-diff-ast';

const obj1 = {
  field1: 'smth',
   field2: 2,
   field3: true,
};

const obj2 = {
  field1: 'smth',
  field2: 3,
  field4: {
    foo: 'bar',
  },
};

const diff = getDiff(obj1, obj2);
console.log(diff);
// Array output >>>
/*
[
  { key: 'field1', level: 1, type: 'unchanged', oldValue: 'smth' },
  { key: 'field2', level: 1, type: 'changed', oldValue: 2, newValue: 3 },
  { key: 'field3', level: 1, type: 'removed', oldValue: true },
  { key: 'field4', level: 1, type: 'added', newValue: { foo: 'bar' } },
];
*/
```

#### `render`
Renders calculated diff in different formats.
```js
import { getDiff, render } from 'object-diff-ast';
const obj1 = {
  field1: 'smth',
  field2: 2,
  field3: true,
};
const obj2 = {
  field1: 'smth',
  field2: 3,
  field4: {
    foo: 'bar',
  },
};
const diff = getDiff(obj1, obj2);

const complex = render(diff); // default format = "complex"
console.log(complex);
// String output >>>
/*
{
    field1: smth
  + field2: 3
  - field2: 2
  - field3: true
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
Returns diff of two configuration files as formatted string. (only Nodejs environment)
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




