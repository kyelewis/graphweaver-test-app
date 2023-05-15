export type ItemValue = string | number | boolean;

export type Item =
  | (() => Record<string, ItemValue>)
  | Record<string, ItemValue>;

export interface FieldOptions<D> {
  name: string;
  type: "string" | "float" | "boolean" | "json";
  resolver?(data: D): any;
  optional?: boolean;
}

export interface Options<D extends Item, Ctx> {
  name: string;
  fields: Array<FieldOptions<D>>;
  init?(): Promise<Ctx>;
  create(ctx: Ctx, data: D): Promise<D>;
  read?(ctx: Ctx, filter?: any, pagination?: any): Promise<Array<D>>;
  update?(ctx: Ctx, id: string, data: D): Promise<D>;
  remove?(ctx: Ctx, id: string): Promise<boolean>;
}
