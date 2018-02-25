import _ from 'lodash';

export default (ast) => {
  const toString = value => (_.isObject(value) ? 'complex value' : `'${value}'`);

  const makeText = (node, parentKey) => {
    const { key, type } = node;
    const { newValue, oldValue, children } = node;

    switch (type) {
      case 'added':
        return `Property '${parentKey}${key}' was added with ${_.isObject(newValue) ? '' : 'value '}${toString(newValue)}`;
      case 'removed':
        return `Property '${parentKey}${key}' was removed`;
      case 'changed':
        return `Property '${parentKey}${key}' was updated. From ${toString(oldValue)} to ${toString(newValue)}`;
      case 'unchanged':
        return '';
      default:
        return children.map(item => makeText(item, `${parentKey}${key}.`)).filter(x => x !== '').join('\n');
    }
  };

  return `${ast.map(node => makeText(node, '')).filter(x => x !== '').join('\n')}\n`;
};
