import { isObject } from 'lodash';
import { Node } from '../Node';
import { JSONValue } from '../JSONObject';

const toString = (value: JSONValue) => (isObject(value) ? 'complex value' : `'${value}'`);

const makeText = (node: Node, parentKey: string): string => {
  const { key } = node;
  if (node.type === 'added') {
    const { newValue } = node;
    return `Property '${parentKey}${key}' was added with ${isObject(newValue) ? '' : 'value '}${toString(newValue)}`;
  }

  if (node.type === 'removed') {
    return `Property '${parentKey}${key}' was removed`;
  }

  if (node.type === 'changed') {
    const { oldValue, newValue } = node;
    return `Property '${parentKey}${key}' was updated. From ${toString(oldValue)} to ${toString(newValue)}`;
  }

  if (node.type === 'unchanged') {
    return '';
  }

  return node.children
    .map(item => makeText(item, `${parentKey}${key}.`))
    .filter(x => x !== '')
    .join('\n');
};

export const plainRender = (ast: Node[]) =>
  `${ast
    .map(node => makeText(node, ''))
    .filter(x => x !== '')
    .join('\n')}\n`;
