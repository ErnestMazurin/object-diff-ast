import { isArray, isPrimitive, isObject, toObject, keys } from '../utils';
import { Node, JSONValue } from '../types';

const basicGap = '  ';

const BRACKETS = {
  array: { open: '[', close: ']' },
  object: { open: '{', close: '}' },
};

const toString = (key: string, value: JSONValue, gap: string, prefix: string): string => {
  if (isArray(value) && value.length === 0) {
    return `${gap}${prefix} ${key}: []\n`;
  }
  if (isObject(value) && keys(value).length === 0) {
    return `${gap}${prefix} ${key}: {}\n`;
  }
  if (isPrimitive(value)) {
    return `${gap}${prefix} ${key}: ${value}\n`;
  }
  const obj = isArray(value) ? toObject(value) : value;

  const bracket = BRACKETS[isArray(value) ? 'array' : 'object'];

  const head = `${gap}${prefix} ${key}: ${bracket.open}\n`;
  const body = keys(obj)
    .map(innerKey => {
      const innerValue = obj[innerKey];
      const innerGap = `${gap}${basicGap.repeat(2)}`;
      return toString(innerKey, innerValue, innerGap, ' ');
    })
    .join('');
  const tail = `${gap}${basicGap}${bracket.close}\n`;

  return `${head}${body}${tail}`;
};

const makeText = (node: Node): string => {
  const gap = basicGap.repeat(node.level * 2 - 1);
  if (node.type === 'added') {
    return `${toString(node.key, node.newValue, gap, '+')}`;
  }
  if (node.type === 'removed') {
    return `${toString(node.key, node.oldValue, gap, '-')}`;
  }
  if (node.type === 'changed') {
    const { oldValue, newValue } = node;
    const oldV = toString(node.key, oldValue, gap, '-');
    const newV = toString(node.key, newValue, gap, '+');
    return `${newV}${oldV}`;
  }
  if (node.type === 'unchanged') {
    return `${toString(node.key, node.oldValue, gap, ' ')}`;
  }

  const bracket = BRACKETS[node.unit];
  const head = `${gap}${basicGap}${node.key}: ${bracket.open}\n`;
  const body = node.children.map(makeText).join('');
  const tail = `${gap}${basicGap}${bracket.close}\n`;
  return `${head}${body}${tail}`;
};

export const complexRender = (ast: Node[]) => `{\n${ast.map(makeText).join('')}}\n`;
