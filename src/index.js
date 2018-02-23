import fs from 'fs';
import yaml from 'js-yaml';

const parse = (text, format) => {
  const parseDisp = {
    json: str => JSON.parse(str),
    yaml: str => yaml.safeLoad(str),
  };
  return parseDisp[format](text);
};

const render = (differenceList) => {
  const core = differenceList.map(item => `  ${item.s} ${item.k}: ${item.v}\n`).join('');
  return `{\n${core}}`;
};


export default (path1, path2, format = 'json') => {
  const file1 = fs.readFileSync(path1).toString();
  const file2 = fs.readFileSync(path2).toString();

  const config1 = parse(file1, format);
  const config2 = parse(file2, format);

  const keys1 = new Set(Object.keys(config1));
  const keys2 = new Set(Object.keys(config2));
  const uniqKeys = new Array(...new Set([...keys1, ...keys2]));

  const callback = (acc, key) => {
    if (config1[key] === config2[key]) {
      return [...acc, { s: ' ', k: key, v: config1[key] }];
    }
    if (keys1.has(key) && keys2.has(key)) {
      return [...acc, { s: '+', k: key, v: config2[key] }, { s: '-', k: key, v: config1[key] }];
    }
    if (keys1.has(key) && !keys2.has(key)) {
      return [...acc, { s: '-', k: key, v: config1[key] }];
    }
    return [...acc, { s: '+', k: key, v: config2[key] }];
  };

  const differenceList = uniqKeys.reduce(callback, []);
  return render(differenceList);
};
