import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import render from './renderers';
import parse from './parsers';

const getAST = (config1, config2) => {
  const iter = (node1, node2, level) => {
    const uniqKeys = _.union(_.keys(node1), _.keys(node2));

    const callback = (key) => {
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
        const children = iter(node1[key], node2[key], level + 1);
        return {
          key, type: 'unit', level, children,
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
    };

    return uniqKeys.map(callback);
  };

  return iter(config1, config2, 1);
};

export default (path1, path2, format = 'complex') => {
  const fileContent1 = fs.readFileSync(path1).toString();
  const fileContent2 = fs.readFileSync(path2).toString();

  const extension1 = path.extname(path1).slice(1);
  const extension2 = path.extname(path2).slice(1);

  const config1 = parse(fileContent1, extension1);
  const config2 = parse(fileContent2, extension2);

  const diffAST = getAST(config1, config2);

  return render(diffAST, format);
};
