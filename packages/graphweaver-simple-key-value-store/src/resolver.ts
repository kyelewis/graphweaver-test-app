import {
  GraphQLEntity,
  createBaseResolver,
  ReadOnly,
} from "@exogee/graphweaver";
import { Float, Resolver, Field, ObjectType, ID } from "type-graphql";

import { caps, createFieldOnClass, setNameOnClass } from "./util";
import { SimpleKeyValueProvider } from "./provider";

export interface UnderlyingData {
  id: string;
  value: string;
}

export class TransformedData {
  id: string;
  valueAsString: string;
  valueAsNumber: number;
  valueAsBoolean: boolean;
}

export const createSimpleKeyValueStoreResolver = ({ name, data }: any) => {
  const entityName = `${caps(name)}`;

  // Create GraphQL Entity
  @ObjectType(entityName)
  @ReadOnly()
  class SimpleKeyValueEntity extends GraphQLEntity<any> {
    public dataEntity!: UnderlyingData;

    @Field(() => ID)
    id!: string;
  }

  setNameOnClass(SimpleKeyValueEntity, entityName);

  createFieldOnClass(
    SimpleKeyValueEntity,
    "valueAsString",
    "string",
    function () {
      return String(this.dataEntity.value);
    }
  );

  createFieldOnClass(
    SimpleKeyValueEntity,
    "valueAsFloat",
    "float",
    function () {
      const number = Number(this.dataEntity.value);
      return Number.isNaN(number) ? null : number;
    },
    { nullable: true }
  );

  createFieldOnClass(
    SimpleKeyValueEntity,
    "valueAsBoolean",
    "boolean",
    function () {
      return Boolean(this.dataEntity.value);
    }
  );

  createFieldOnClass(SimpleKeyValueEntity, "type", "string", function () {
    return typeof this.dataEntity.value;
  });

  // Create Base Resolver
  @Resolver(() => TransformedData)
  class SimpleKeyValueResolver extends createBaseResolver<any, any>(
    SimpleKeyValueEntity,
    new SimpleKeyValueProvider(entityName, data)
  ) {}

  setNameOnClass(SimpleKeyValueResolver, `${entityName}Resolver`);

  return SimpleKeyValueResolver;
};
