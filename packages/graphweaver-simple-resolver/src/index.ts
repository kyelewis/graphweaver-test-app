import { createSimpleResolver } from "./resolver";
import type { ItemValue, Item, FieldOptions, Options } from "./types";

export default class GraphweaverSimpleResolver<D extends Item> {
  private resolver;
  private entity;

  constructor(options: Options<D>) {
    const { resolver, entity } = createSimpleResolver(options);
    this.resolver = resolver;
    this.entity = entity;
  }

  public link(fieldName: string, reference: () => any) {
    throw new Error("Not implemented");
  }

  public resolvers() {
    return [this.resolver];
  }

  public entities() {
    return [this.entity];
  }
}
