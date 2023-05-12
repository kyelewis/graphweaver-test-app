import { createSimpleKeyValueStoreResolver } from "./resolver";

export type DataValue = string | number | boolean;
export type Data =
  | (() => Record<string, DataValue>)
  | Record<string, DataValue>;

export interface Options<D extends Data> {
  name: string;
  data: D;
}

export default class GraphweaverSimpleKeyValueStore<D extends Data> {
  private resolver;

  constructor(private options: Options<D>) {
    this.resolver = createSimpleKeyValueStoreResolver(this.options);
  }

  public resolvers() {
    return [this.resolver];
  }
}
