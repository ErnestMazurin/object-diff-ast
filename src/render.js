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
    const { key, status, level } = node;
    const { value1, value2, children } = node;

    const gap = basicGap.repeat((level * 2) - 1);

    if (status === 'added') {
      return `${toString(key, value2, gap, '+')}`;
    }

    if (status === 'removed') {
      return `${toString(key, value1, gap, '-')}`;
    }

    if (status === 'changed') {
      const str1 = toString(key, value1, gap, '-');
      const str2 = toString(key, value2, gap, '+');
      return (_.isObject(value1) || _.isObject(value2)) ?
        [str1, str2] : [str2, str1];
    }

    if (status === 'unchanged') {
      return `${toString(key, value1, gap, ' ')}`;
    }

    const head = `${gap}${basicGap}${key}: {\n`;
    const body = _.flatten(children.map(makeText)).join('');
    const tail = `${gap}${basicGap}}\n`;
    return `${head}${body}${tail}`;
  };

  const core = _.flatten(ast.map(makeText)).join('');
  return `{\n${core}}\n`;
};
