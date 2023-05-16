import { GraphQLEntity, createBaseResolver, BackendProvider } from "@exogee/graphweaver";
import { Resolver as ResolverDecorator, Field, ObjectType, ID } from "type-graphql";

import {
  caps,
  createFieldOnClass,
  setNameOnClass,
  setClassReadOnly,
} from "./util";

export type ItemValue = string | number | boolean;
export type Item = Record<string, ItemValue>;

export interface FieldOptions<D> {
  name: string;
  type: "string" | "float" | "boolean";
  resolve?(data: D, fieldName: string): any;
  optional?: boolean;
}

export interface ResolverOptions<D extends Item, Ctx> {
  name: string;
  fields: Array<FieldOptions<D>>;
  provider: BackendProvider<D, any> 
} 


export const createResolver = <D extends Item, Ctx>({
  name,
  fields,
  provider,
  readOnly
}: ResolverOptions<D, Ctx>) => {
  const entityName = caps(name);

  // Create GraphQL Entity
  @ObjectType(entityName)
  class Entity extends GraphQLEntity<D> {
    public dataEntity!: D;

    @Field(() => ID)
    id!: string;
  }

  setNameOnClass(Entity, entityName);
  if(readOnly) setClassReadOnly(Entity);

  // Create fields on the class
  for (const {
    name: fieldName,
    type: fieldType,
    resolve: fieldResolve,
    optional: fieldOptional = true,
  } of fields) {
    createFieldOnClass(
       Entity,
      fieldName,
      fieldType,
      function () {
        if (fieldResolve) return fieldResolve(this.dataEntity, fieldName);
        return this.dataEntity[fieldName];
      },
      { nullable: fieldOptional }
    );
  }

  // Create Base Resolver
  // @todo type!
  @ResolverDecorator(() => Entity)
  class Resolver extends createBaseResolver<any, any>(
    Entity,
    provider
  ) {}

  setNameOnClass(Resolver, `${entityName}Resolver`);

  return { provider, entity: Entity, resolver: Resolver};
};
