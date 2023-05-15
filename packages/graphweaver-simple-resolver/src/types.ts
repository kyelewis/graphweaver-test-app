export type ItemValue = string | number | boolean;

export type Item =
  | (() => Record<string, ItemValue>)
  | Record<string, ItemValue>;

export interface FieldOptions {
  name: string;
  type: "string" | "float" | "boolean";
}

export interface Options<D extends Item, Ctx> {
  name: string;
  fields: Array<FieldOptions>;
  read(ctx: Ctx, filter?: any, pagination?: any): Promise<Array<D>>;
  write(ctx: Ctx, data: Array<D>): Promise<any>;
  init(): Ctx;
}
