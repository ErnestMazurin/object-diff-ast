type JSONPrimitive = string | number | boolean | null;

export type JSONValue = JSONObject | JSONPrimitive; // | JSONArray;

// TODO: add array support
// type JSONArray = JSONValue[];

export type JSONObject = { [key: string]: JSONValue };
