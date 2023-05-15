import { createSimpleResolver } from "./resolver";
import type { ItemValue, Item, FieldOptions, Options } from "./types";

export default class GraphweaverSimpleResolver<D extends Item> {
  private resolver;

  constructor(options: Options<D>) {
    this.resolver = createSimpleResolver(options);
  }

  public resolvers() {
    return [this.resolver];
  }
}
