import { Node } from '../Node';

export const jsonRender = (ast: Node[]) => `${JSON.stringify(ast, null, 2)}\n`;
