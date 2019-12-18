import { isObject } from 'lodash';
import { Node } from '../Node';
import { JSONValue } from '../JSONObject';

const toString = (value: JSONValue) => (isObject(value) ? 'complex value' : `'${value}'`);

const makeText = (node: Node, parentKey: string): string => {
  if (node.type === 'added') {
    const title = isObject(node.newValue) ? '' : 'value ';
    const newValue = toString(node.newValue);
    return `Property '${parentKey}${node.key}' was added with ${title}${toString(newValue)}`;
  }
  if (node.type === 'removed') {
    return `Property '${parentKey}${node.key}' was removed`;
  }
  if (node.type === 'changed') {
    const oldValue = toString(node.oldValue);
    const newValue = toString(node.newValue);
    return `Property '${parentKey}${node.key}' was updated. From ${oldValue} to ${newValue}`;
  }
  if (node.type === 'unchanged') {
    return '';
  }
  return node.children
    .map(item => makeText(item, `${parentKey}${node.key}.`))
    .filter(x => x !== '')
    .join('\n');
};

export const plainRender = (ast: Node[]) =>
  `${ast
    .map(node => makeText(node, ''))
    .filter(x => x !== '')
    .join('\n')}\n`;
