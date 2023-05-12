import { createStaticResolver, StaticData } from "./resolver";

export interface GraphweaverStaticAppOptions<D extends StaticData> {
  name: string;
  data: D;
}

export default class GraphweaverStaticApp<D extends StaticData> {
  private resolver;

  constructor(private options: GraphweaverStaticAppOptions<D>) {
    this.resolver = createStaticResolver(this.options);
  }

  public resolvers() {
    return [this.resolver];
  }
}
