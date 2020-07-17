import { Node } from '../types';

export const jsonRender = (ast: Node[]): string => `${JSON.stringify(ast, null, 2)}\n`;
