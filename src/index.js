import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const parseDispatcher = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

const render = (differenceList) => {
  const core = differenceList.map(item => `  ${item.sign} ${item.key}: ${item.value}\n`).join('');
  return `{\n${core}}\n`;
};

const diff = (config1, config2) => {
  const keys1 = new Set(_.keys(config1));
  const keys2 = new Set(_.keys(config2));
  const uniqKeys = _.union(_.keys(config1), _.keys(config2));

  const callback = (acc, key) => {
    if (config1[key] === config2[key]) {
      return [...acc, { sign: ' ', key, value: config1[key] }];
    }
    if (keys1.has(key) && keys2.has(key)) {
      return [...acc, { sign: '+', key, value: config2[key] }, { sign: '-', key, value: config1[key] }];
    }
    if (keys1.has(key) && !keys2.has(key)) {
      return [...acc, { sign: '-', key, value: config1[key] }];
    }
    return [...acc, { sign: '+', key, value: config2[key] }];
  };

  return uniqKeys.reduce(callback, []);
};

export default (path1, path2, format = 'json') => {
  const file1 = fs.readFileSync(path1).toString();
  const file2 = fs.readFileSync(path2).toString();

  const config1 = parseDispatcher[format](file1);
  const config2 = parseDispatcher[format](file2);

  const differenceList = diff(config1, config2);

  return render(differenceList);
};
