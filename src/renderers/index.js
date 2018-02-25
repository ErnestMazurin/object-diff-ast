import complexRender from './complex';
import plainRender from './plain';


const rendersDispatcher = {
  complex: complexRender,
  plain: plainRender,
};

export default (ast, format) => rendersDispatcher[format](ast);
