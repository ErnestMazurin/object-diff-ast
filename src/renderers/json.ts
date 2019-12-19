import { Node } from '../types';

export const jsonRender = (ast: Node[]) => `${JSON.stringify(ast, null, 2)}\n`;
