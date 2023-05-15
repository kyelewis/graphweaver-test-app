import {
  Filter,
  PaginationOptions,
  BackendProvider,
} from "@exogee/graphweaver";

import { Options } from "./types";

export class SimpleProvider<D, G, Ctx> implements BackendProvider<D, G> {
  public readonly backendId: string;
  protected create: Options["create"];
  protected read: Options["read"];
  protected update: Options["update"];
  protected remove: Options["remove"];

  public context: Ctx | undefined = undefined;
  private init: Promise<Ctx>;

  constructor({ name, create, read, update, remove, init }: Options<D>) {
    this.backendId = `SimpleResolver`;
    this.create = create;
    this.read = read;
    this.update = update;
    this.remove = remove;
    this.init = new Promise(async (resolve) => {
      this.context = await init?.();
      resolve();
    });
  }

  async find(filter: Filter<G>, pagination?: PaginationOptions): Promise<D[]> {
    await this.init;
    const result = await this.read(this.context, filter, pagination);
    return Array.isArray(result) ? result : [result];
  }

  async findOne(filter: Filter<G>): Promise<D | null> {
    await this.init;
    console.log("findOne");
    const result = await this.read(this.context, filter);
    console.log("Found", result);
    const oneResult = Array.isArray(result) ? result?.[0] : result;
    return oneResult || null;
  }

  findByRelatedId(
    entity: any,
    relatedField: string,
    relatedIds: readonly string[],
    filter?: Filter<G>
  ): Promise<D[]> {
    throw new Error("Not implemented: findByRelatedId");
  }

  async updateOne(id: string, updateArgs: Partial<G>): Promise<D> {
    if (!this.update) throw new Error("update not available");
    await this.init;
    return this.update(this.context, id, updateArgs);
  }

  async updateMany(entities: Partial<G>[]): Promise<D[]> {
    if (!this.update) throw new Error("update not available");
    await this.init;
    throw new Error("Not implemented: updateMany");
  }

  async createOne(entity: Partial<G>): Promise<D> {
    if (!this.create) throw new Error("create not available");
    await this.init;
    return this.create(this.context, entity);
  }

  async createMany(entities: Partial<G>[]): Promise<D[]> {
    if (!this.create) throw new Error("create not available");
    await this.init;
    throw new Error("Not implemented: createMany");
  }

  async createOrUpdateMany(entities: Partial<G>[]): Promise<D[]> {
    if (!this.update || !this.create)
      throw new Error("create/update not available");
    throw new Error("Not implemented: createOrUpdateMany");
  }

  async deleteOne(filter: Filter<G>): Promise<boolean> {
    if (!this.remove) throw new Error("delete not available");
    await this.init;
    throw new Error("Not implemented: deleteOne");
  }

  getRelatedEntityId(entity: any, relatedIdField: string): string {
    throw new Error("not implemented: getRelatedEntityId");
  }

  isCollection(entity: unknown): boolean {
    return false;
  }
}
