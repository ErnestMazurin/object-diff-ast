import complexRender from './complex';
import plainRender from './plain';
import jsonRender from './json';

const rendersDispatcher = {
  complex: complexRender,
  plain: plainRender,
  json: jsonRender,
};

export default (ast, format) => rendersDispatcher[format](ast);
