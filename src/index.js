import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';
import render from './render';

const parseDispatcher = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

const getAST = (config1, config2) => {
  const iter = (node1, node2, level) => {
    const uniqKeys = _.union(_.keys(node1), _.keys(node2));

    const callback = (key) => {
      if (_.has(node1, key) && !_.has(node2, key)) {
        return {
          key, value1: node1[key], status: 'removed', level, children: [],
        };
      }
      if (!_.has(node1, key) && _.has(node2, key)) {
        return {
          key, value2: node2[key], status: 'added', level, children: [],
        };
      }
      if (_.isObject(node1[key]) && _.isObject(node2[key])) {
        const children = iter(node1[key], node2[key], level + 1);
        return {
          key, status: 'unit', level, children,
        };
      }
      if (node1[key] === node2[key]) {
        return {
          key, value1: node1[key], status: 'unchanged', level, children: [],
        };
      }
      return {
        key, value1: node1[key], value2: node2[key], status: 'changed', level, children: [],
      };
    };

    return uniqKeys.map(callback);
  };

  return iter(config1, config2, 1);
};

export default (path1, path2, format = 'json') => {
  const fileContent1 = fs.readFileSync(path1).toString();
  const fileContent2 = fs.readFileSync(path2).toString();

  const config1 = parseDispatcher[format](fileContent1);
  const config2 = parseDispatcher[format](fileContent2);

  const diffAST = getAST(config1, config2);

  return render(diffAST);
};
