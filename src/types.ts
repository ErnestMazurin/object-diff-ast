export type JSONPrimitive = string | number | boolean | null;

export type JSONValue = JSONObject | JSONPrimitive; // | JSONArray;

// TODO: add array support
// type JSONArray = JSONValue[];

export type JSONObject = { [key: string]: JSONValue };

interface CommonPart {
  readonly key: string;
  readonly level: number;
}

export interface RemovedNode extends CommonPart {
  readonly type: 'removed';
  readonly oldValue: JSONValue;
}

export interface AddedNode extends CommonPart {
  readonly type: 'added';
  readonly newValue: JSONValue;
}

export interface UnchangedNode extends CommonPart {
  readonly type: 'unchanged';
  readonly oldValue: JSONValue;
}

export interface ChangeNode extends CommonPart {
  readonly type: 'changed';
  readonly oldValue: JSONValue;
  readonly newValue: JSONValue;
}

export interface UnitNode extends CommonPart {
  readonly type: 'unit';
  readonly children: Array<Node>;
}

export type Node = RemovedNode | AddedNode | UnchangedNode | ChangeNode | UnitNode;
