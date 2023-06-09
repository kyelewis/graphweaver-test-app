import {
  Filter,
  PaginationOptions,
  BackendProvider,
} from "@exogee/graphweaver";

export interface ProviderOptions<D, Ctx> {
  init?(): Promise<Ctx>;
  create(ctx: Ctx, data: D): Promise<D>;
  read?(ctx: Ctx, filter?: any, pagination?: any): Promise<Array<D>>;
  update?(ctx: Ctx, id: string, data: D): Promise<D>;
  remove?(ctx: Ctx, id: string): Promise<boolean>;
  backendId: string;
}

export const createProvider = <D, G, Ctx>(
    options: ProviderOptions<D, Ctx>,
    ) => {

class Provider<D, G, Ctx> implements BackendProvider<D, G> {
  public readonly backendId: string;

  protected create: ProviderOptions<D, Ctx>["create"];
  protected read: ProviderOptions<D, Ctx>["read"];
  protected update: ProviderOptions<D, Ctx>["update"];
  protected remove: ProviderOptions<D, Ctx>["remove"];
  protected initFn: Promise<Ctx>;

  private context: Ctx;

  constructor(
    { create, read, update, remove, init, backendId }: ProviderOptions<D, Ctx>,
  ) {
    this.backendId = backendId;
    this.create = create;
    this.read = read;
    this.update = update;
    this.remove = remove;
    this.initFn = new Promise<Ctx>(async (resolve, reject) => {
      this.context = await init?.();
      resolve(this.context);
    });
  }

  public init() {
    return this.initFn;
  }

  async find(filter: Filter<G>, pagination?: PaginationOptions): Promise<D[]> {
    await this.init;
    const result = await this.read(this.context, filter, pagination);
    return Array.isArray(result) ? result : [result];
  }

  async findOne(filter: Filter<G>): Promise<D | null> {
    await this.initFn;
    const result = await this.read(this.context, filter);
    const oneResult = Array.isArray(result) ? result?.[0] : result;
    return oneResult || null;
  }

  async findByRelatedId(
    entity: any,
    relatedField: string,
    relatedIds: readonly string[],
    filter?: Filter<G>
  ): Promise<D[]> {
    await this.initFn;
    throw new Error("Not implemented: findByRelatedId");
  }

  async updateOne(id: string, updateArgs: Partial<G>): Promise<D> {
    await this.initFn;
    if (!this.update) throw new Error("update not available");
    return this.update(this.context, id, updateArgs);
  }

  async updateMany(entities: Partial<G>[]): Promise<D[]> {
    await this.initFn;
    if (!this.update) throw new Error("update not available");
    throw new Error("Not implemented: updateMany");
  }

  async createOne(entity: Partial<G>): Promise<D> {
    await this.initFn;
    if (!this.create) throw new Error("create not available");
    return this.create(this.context, entity);
  }

  async createMany(entities: Partial<G>[]): Promise<D[]> {
    await this.initFn;
    if (!this.create) throw new Error("create not available");
    throw new Error("Not implemented: createMany");
  }

  async createOrUpdateMany(entities: Partial<G>[]): Promise<D[]> {
    await this.initFn;
    if (!this.update || !this.create)
      throw new Error("create/update not available");
    throw new Error("Not implemented: createOrUpdateMany");
  }

  async deleteOne(filter: Filter<G>): Promise<boolean> {
    await this.initFn;
    if (!this.remove) throw new Error("delete not available");
    throw new Error("Not implemented: deleteOne");
  }

  getRelatedEntityId(entity: any, relatedIdField: string): string {
    throw new Error("not implemented: getRelatedEntityId");
  }

  isCollection(entity: unknown): boolean {
    return false;
  }
}

 return new Provider(options);

};
