import {
  Filter,
  PaginationOptions,
  BackendProvider,
} from "@exogee/graphweaver";

import { Options } from "./types";

export class SimpleProvider<D, G, Ctx> implements BackendProvider<D, G> {
  public readonly backendId: string;
  protected read: Options["read"];
  protected write: Options["write"];
  public context: Ctx | undefined = undefined;
  private init: Promise<Ctx>;

  constructor({ name, read, write, init }: Options<D>) {
    this.backendId = `SimpleResolver`;
    this.read = read;
    this.write = write;
    this.init = new Promise(async (resolve) => {
      console.log("Init...");
      this.context = await init?.();
      console.log("Context set", this.context);
      resolve();
    });
  }

  async find(filter: Filter<G>, pagination?: PaginationOptions): Promise<D[]> {
    await this.init;
    return this.read(this.context, filter, pagination) ?? [];
  }

  async findOne(filter: Filter<G>): Promise<D | null> {
    await this.init;
    const result = await this.read(this.context, filter);
    console.log("findOne result", result);
    return result?.[0] || null;
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
    await this.init;
    return this.write(this.context, updateArgs, id);
  }

  updateMany(entities: Partial<G>[]): Promise<D[]> {
    throw new Error("Not implemented: updateMany");
  }

  async createOne(entity: Partial<G>): Promise<D> {
    await this.init;
    return this.write(this.context, entity);
  }

  async createMany(entities: Partial<G>[]): Promise<D[]> {
    throw new Error("Not implemented: createMany");
  }

  createOrUpdateMany(entities: Partial<G>[]): Promise<D[]> {
    throw new Error("Not implemented: createOrUpdateMany");
  }

  deleteOne(filter: Filter<G>): Promise<boolean> {
    throw new Error("Not implemented: deleteOne");
  }

  getRelatedEntityId(entity: any, relatedIdField: string): string {
    throw new Error("not implemented: getRelatedEntityId");
  }

  isCollection(entity: unknown): boolean {
    return false;
  }
}
