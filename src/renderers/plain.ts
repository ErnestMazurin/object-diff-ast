import { isPrimitive } from '../utils';
import { Node, JSONValue } from '../types';

const toString = (value: JSONValue) => (!isPrimitive(value) ? 'complex value' : `'${value}'`);

const makeText = (node: Node, parentKey: string): string => {
  if (node.type === 'added') {
    const title = !isPrimitive(node.newValue) ? '' : 'value ';
    const newValue = toString(node.newValue);
    return `Property '${parentKey}${node.key}' was added with ${title}${newValue}`;
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
