import _ from 'lodash';

export default (ast) => {
  const toString = value => (_.isObject(value) ? 'complex value' : `'${value}'`);

  const makeText = (node, parentKey) => {
    const { key, type } = node;
    const { newValue, oldValue, children } = node;

    if (type === 'added') {
      return `Property '${parentKey}${key}' was added with ${_.isObject(newValue) ? '' : 'value '}${toString(newValue)}\n`;
    }

    if (type === 'removed') {
      return `Property '${parentKey}${key}' was removed\n`;
    }

    if (type === 'changed') {
      return `Property '${parentKey}${key}' was updated. From ${toString(oldValue)} to ${toString(newValue)}\n`;
    }

    if (type === 'unchanged') {
      return '';
    }

    return children.map(item => makeText(item, `${parentKey}${key}.`)).join('');
  };
  return ast.map(node => makeText(node, '')).join('');
};
