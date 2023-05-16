import type { BackendProvider } from "@exogee/graphweaver";

export type ItemValue = string | number | boolean;
export type Item = Record<string, ItemValue>;

export interface FieldOptions<D> {
  name: string;
  type: "string" | "float" | "boolean";
  resolve?(data: D, fieldName: string): any;
  optional?: boolean;
}

export interface ProviderOptions<D, Ctx> {
  init?(): Promise<Ctx>;
  create(ctx: Ctx, data: D): Promise<D>;
  read?(ctx: Ctx, filter?: any, pagination?: any): Promise<Array<D>>;
  update?(ctx: Ctx, id: string, data: D): Promise<D>;
  remove?(ctx: Ctx, id: string): Promise<boolean>;
}

export interface Options<D extends Item, Ctx> {
  name: string;
  fields: Array<FieldOptions<D>>;
  provider: any; //  ProviderOptions<D, Ctx> | BackendProvider<D, any>,
  backendId?: string;
}
