import yaml from 'js-yaml';
import ini from 'ini';

const parsersDispatcher = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

export default (data, extention) => parsersDispatcher[extention](data);
