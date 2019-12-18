import { complexRender } from './complex';
import { plainRender } from './plain';
import { jsonRender } from './json';
import { Node } from '../Node';

const RENDERERS_DISPATCHER = {
  complex: complexRender,
  plain: plainRender,
  json: jsonRender,
} as const;

type Renderer = keyof typeof RENDERERS_DISPATCHER;

const isValidFormat = (format: string): format is Renderer => format in RENDERERS_DISPATCHER;

export const render = (ast: Node[], format = 'complex') => {
  if (isValidFormat(format)) {
    return RENDERERS_DISPATCHER[format](ast);
  }
  throw new Error('Unsupported output format');
};
