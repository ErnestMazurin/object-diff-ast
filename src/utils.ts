export const keys = Object.keys;

export const union = <T>(arr1: T[], arr2: T[]) => Array.from(new Set([...arr1, ...arr2]));

export const has = <T extends {}>(obj: T, property: string) => obj.hasOwnProperty(property);

export const isObject = (value: unknown): value is object => typeof value === 'object';

// export const isArray = Array.isArray;
