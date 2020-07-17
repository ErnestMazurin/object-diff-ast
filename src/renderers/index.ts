import { complexRender } from './complex';
import { plainRender } from './plain';
import { jsonRender } from './json';
import { Node } from '../types';
import { has } from '../utils';

const RENDERERS_DISPATCHER = {
  complex: complexRender,
  plain: plainRender,
  json: jsonRender,
} as const;

type Renderer = keyof typeof RENDERERS_DISPATCHER;

const isValidFormat = (format: string): format is Renderer => has(RENDERERS_DISPATCHER, format);

/**
 * Allows you to render ast diff tree
 * @param ast - diff tree
 * @param format - one of "plain", "json" or "complex" (default)
 */
export const render = (ast: Node[], format = 'complex'): string => {
  if (isValidFormat(format)) {
    return RENDERERS_DISPATCHER[format](ast);
  }
  throw new Error('Unsupported output format');
};
