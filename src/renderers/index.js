import complexRender from './complex';
import plainRender from './plain';
import jsonRender from './json';

const rendersDispatcher = {
  complex: complexRender,
  plain: plainRender,
  json: jsonRender,
};

export default (ast, format) => {
  const renderer = rendersDispatcher[format];
  if (renderer === undefined) {
    return rendersDispatcher.complex(ast);
  }
  return renderer(ast);
};
