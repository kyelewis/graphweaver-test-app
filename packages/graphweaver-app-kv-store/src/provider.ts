import {
  Filter,
  PaginationOptions,
  BackendProvider,
} from "@exogee/graphweaver";

export class StaticProvider<D extends { id: string; value: any }, G>
  implements BackendProvider<D, G>
{
  public readonly backendId: string;
  protected data: D;

  constructor(entityName: string, data: D) {
    this.backendId = `Static-${entityName}`;
    this.data = data;
  }

  private get transformedData() {
    return Object.entries(this.data).map(([id, value]) => ({
      id,
      value,
    }));
  }

  public async find(
    filter: Filter<G>,
    pagination?: PaginationOptions
  ): Promise<D[]> {
    // @todo implement filtering/pagination
    console.log("find", filter, pagination);
    return Promise.resolve(this.transformedData as D[]);
  }

  findOne(filter: Filter<G>): Promise<D | null> {
    // @todo implement other than id
    if (!filter.id) return Promise.resolve(null);
    return Promise.resolve(
      this.transformedData.find((data) => data.id === filter.id) as D
    );
  }

  findByRelatedId(
    entity: any,
    relatedField: string,
    relatedIds: readonly string[],
    filter?: Filter<G>
  ): Promise<D[]> {
    // @todo implement findByRelatedId
    return Promise.resolve([] as D[]);
  }

  updateOne(id: string, updateArgs: Partial<G>): Promise<D> {
    throw new Error("Not implemented: updateOne");
  }

  updateMany(entities: Partial<G>[]): Promise<D[]> {
    throw new Error("Not implemented: updateMany");
  }

  createOne(entity: Partial<G>): Promise<D> {
    throw new Error("Not implemented: createOne");
  }

  createMany(entities: Partial<G>[]): Promise<D[]> {
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
