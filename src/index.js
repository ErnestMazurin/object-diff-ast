import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';


const parseDispatcher = {
  json: str => JSON.parse(str),
  yaml: str => yaml.safeLoad(str),
  ini: str => ini.parse(str),
};


const render = (differenceList) => {
  const core = differenceList.map(item => `  ${item.sign} ${item.key}: ${item.value}\n`).join('');
  return `{\n${core}}\n`;
};


export default (path1, path2, format = 'json') => {
  // ----------- read files -----------------------------
  const file1 = fs.readFileSync(path1).toString();
  const file2 = fs.readFileSync(path2).toString();

  // ----------- parse files ----------------------------
  const config1 = parseDispatcher[format](file1);
  const config2 = parseDispatcher[format](file2);

  // ----------- get differences ------------------------
  const keys1 = new Set(Object.keys(config1));
  const keys2 = new Set(Object.keys(config2));
  const uniqKeys = Object.keys({ ...config1, ...config2 });

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

  const differenceList = uniqKeys.reduce(callback, []);

  // ------------ render result --------------------------
  return render(differenceList);
};
