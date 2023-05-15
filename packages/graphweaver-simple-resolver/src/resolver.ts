import { GraphQLEntity, createBaseResolver } from "@exogee/graphweaver";
import { Resolver, Field, ObjectType, ID } from "type-graphql";

import {
  caps,
  createFieldOnClass,
  setNameOnClass,
  setClassReadOnly,
} from "./util";
import { SimpleProvider } from "./provider";
import type { ItemValue, Item, FieldOptions, Options } from "./types";

export const createSimpleResolver = <D extends Item, Ctx>(
  options: Options<D, Ctx>
) => {
  const { name, fields, create, update, remove } = options;
  const entityName = caps(name);

  // Create GraphQL Entity
  @ObjectType(entityName)
  class SimpleEntity extends GraphQLEntity<D> {
    public dataEntity!: D;

    @Field(() => ID)
    id!: string;
  }

  setNameOnClass(SimpleEntity, entityName);

  if (!create && !update && !remove) setClassReadOnly(SimpleEntity);

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
        if (fieldResolve) return fieldResolve(this.dataEntity);
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
    new SimpleProvider(options)
  ) {}

  setNameOnClass(SimpleResolver, `${entityName}Resolver`);

  return { entity: SimpleEntity, resolver: SimpleResolver };
};
