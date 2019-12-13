import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import render from './renderers';
import parse from './parsers';

const iter = (node1, node2, level) => _.union(_.keys(node1), _.keys(node2)).map((key) => {
  if (_.has(node1, key) && !_.has(node2, key)) {
    return {
      key, oldValue: node1[key], type: 'removed', level, children: [],
    };
  }
  if (!_.has(node1, key) && _.has(node2, key)) {
    return {
      key, newValue: node2[key], type: 'added', level, children: [],
    };
  }
  if (_.isObject(node1[key]) && _.isObject(node2[key])) {
    return {
      key, type: 'unit', level, children: iter(node1[key], node2[key], level + 1),
    };
  }
  if (node1[key] === node2[key]) {
    return {
      key, oldValue: node1[key], type: 'unchanged', level, children: [],
    };
  }
  return {
    key, oldValue: node1[key], newValue: node2[key], type: 'changed', level, children: [],
  };
});

const getAST = (config1, config2) => iter(config1, config2, 1);

export const getDiff = (obj1, obj2, format) => render(getAST(obj1, obj2), format);

export const getConfigDiff = (path1, path2, format = 'complex') => {
  const fileContent1 = fs.readFileSync(path1).toString();
  const fileContent2 = fs.readFileSync(path2).toString();

  const extension1 = path.extname(path1).slice(1);
  const extension2 = path.extname(path2).slice(1);

  const config1 = parse(fileContent1, extension1);
  const config2 = parse(fileContent2, extension2);

  return getDiff(config1, config2, format);
};
