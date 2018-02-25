import _ from 'lodash';

export default (ast) => {
  const basicGap = '  ';

  const toString = (key, value, gap, sign) => {
    if (_.isObject(value)) {
      const head = `${gap}${sign} ${key}: {\n`;
      const tail = `${gap}${basicGap}}\n`;

      const callback = (innerKey) => {
        const innerValue = value[innerKey];
        const innerGap = `${gap}${basicGap.repeat(2)}`;
        if (_.isObject(innerValue)) {
          return toString(innerKey, innerValue, innerGap, basicGap);
        }
        return `${innerGap}${basicGap}${innerKey}: ${innerValue}\n`;
      };

      return `${head}${_.keys(value).map(callback).join('')}${tail}`;
    }

    return `${gap}${sign} ${key}: ${value}\n`;
  };

  const makeText = (node) => {
    const { key, type, level } = node;
    const { oldValue, newValue, children } = node;

    const gap = basicGap.repeat((level * 2) - 1);

    if (type === 'added') {
      return `${toString(key, newValue, gap, '+')}`;
    }

    if (type === 'removed') {
      return `${toString(key, oldValue, gap, '-')}`;
    }

    if (type === 'changed') {
      const str1 = toString(key, oldValue, gap, '-');
      const str2 = toString(key, newValue, gap, '+');
      return (_.isObject(oldValue) || _.isObject(newValue)) ?
        [str1, str2] : [str2, str1];
    }

    if (type === 'unchanged') {
      return `${toString(key, oldValue, gap, ' ')}`;
    }

    const head = `${gap}${basicGap}${key}: {\n`;
    const body = _.flatten(children.map(makeText)).join('');
    const tail = `${gap}${basicGap}}\n`;
    return `${head}${body}${tail}`;
  };

  const core = _.flatten(ast.map(makeText)).join('');
  return `{\n${core}}\n`;
};
