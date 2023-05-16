import { GraphQLEntity, createBaseResolver } from "@exogee/graphweaver";
import { Resolver, Field, ObjectType, ID } from "type-graphql";

import {
  caps,
  createFieldOnClass,
  setNameOnClass,
  setClassReadOnly,
  isBackendProvider,
} from "./util";
import { SimpleProvider } from "./provider";
import type { ItemValue, Item, FieldOptions, Options } from "./types";

export const createSimpleResolver = <D extends Item, Ctx>({
  name,
  fields,
  provider,
  backendId,
}: Options<D, Ctx>) => {
  const entityName = caps(name);

  // Create or use existing provider
  const Provider = isBackendProvider(provider)
    ? provider
    : new SimpleProvider(provider, backendId || "SimpleResolver");

  // Create GraphQL Entity
  @ObjectType(entityName)
  class SimpleEntity extends GraphQLEntity<D> {
    public dataEntity!: D;

    @Field(() => ID)
    id!: string;
  }

  setNameOnClass(SimpleEntity, entityName);
  if (!provider.create && !provider.update && !provider.remove)
    setClassReadOnly(SimpleEntity);

  // Create fields on the class
  for (const {
    name: fieldName,
    type: fieldType,
    resolve: fieldResolve,
    optional: fieldOptional = true,
  } of fields) {
    createFieldOnClass(
      SimpleEntity,
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
  @Resolver(() => SimpleEntity)
  class SimpleResolver extends createBaseResolver<any, any>(
    SimpleEntity,
    Provider
  ) {}

  setNameOnClass(SimpleResolver, `${entityName}Resolver`);

  return { entity: SimpleEntity, resolver: SimpleResolver };
};
