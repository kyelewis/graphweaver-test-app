import { createSimpleResolver } from "./resolver";
import type { ItemValue, Item, FieldOptions, Options } from "./types";

export default class GraphweaverSimpleResolver<D extends Item, Ctx = any> {
  private resolver;
  private entity;

  constructor(options: Options<D, Ctx>) {
    const { entity, resolver } = createSimpleResolver(options);
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
