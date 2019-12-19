import { isObject, keys } from '../utils';
import { Node, JSONValue } from '../types';

const basicGap = '  ';

const toString = (key: string, value: JSONValue, gap: string, prefix: string): string => {
  if (!isObject(value)) {
    return `${gap}${prefix} ${key}: ${value}\n`;
  }

  const head = `${gap}${prefix} ${key}: {\n`;
  const tail = `${gap}${basicGap}}\n`;
  const body = keys(value)
    .map(innerKey => {
      const innerValue = value[innerKey];
      const innerGap = `${gap}${basicGap.repeat(2)}`;
      if (isObject(innerValue)) {
        return toString(innerKey, innerValue, innerGap, basicGap);
      }
      return `${innerGap}${basicGap}${innerKey}: ${innerValue}\n`;
    })
    .join('');

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
    const str1 = toString(node.key, oldValue, gap, '-');
    const str2 = toString(node.key, newValue, gap, '+');
    return isObject(oldValue) || isObject(newValue) ? `${str1}${str2}` : `${str2}${str1}`;
  }

  if (node.type === 'unchanged') {
    return `${toString(node.key, node.oldValue, gap, ' ')}`;
  }

  const head = `${gap}${basicGap}${node.key}: {\n`;
  const body = node.children.map(makeText).join('');
  const tail = `${gap}${basicGap}}\n`;
  return `${head}${body}${tail}`;
};

export const complexRender = (ast: Node[]) => `{\n${ast.map(makeText).join('')}}\n`;
