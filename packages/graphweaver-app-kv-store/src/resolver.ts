import {
  GraphQLEntity,
  createBaseResolver,
  ReadOnly,
} from "@exogee/graphweaver";
import { Float, Resolver, Field, ObjectType, ID } from "type-graphql";

import { caps } from "./util";
import { StaticProvider } from "./provider";

export type StaticData = Record<string, string | number | boolean>;

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

const setName = (target: any, name: string) =>
  Object.defineProperty(target, "name", { value: name });

const typeFunctionForType = (type: "string" | "float" | "boolean"): any => {
  switch (type) {
    case "string":
      return () => String;
    case "float":
      return () => Float;
    case "boolean":
      return () => Boolean;
  }
};

const createField = (
  target: any,
  name: string,
  type: "string" | "float" | "boolean",
  value: any,
  fieldOptions?: any
) => {
  Object.defineProperty(target.prototype, name, { value });
  Field(typeFunctionForType(type), fieldOptions)(
    target.prototype,
    name,
    Object.getOwnPropertyDescriptor(target.prototype, name)
  );
};

export const createStaticResolver = ({ name, data }: any) => {
  const entityName = `Static${caps(name)}`;

  // Create GraphQL Entity
  @ObjectType(entityName)
  @ReadOnly()
  class StaticEntity extends GraphQLEntity<any> {
    public dataEntity!: UnderlyingData;

    @Field(() => ID)
    id!: string;
  }

  setName(StaticEntity, entityName);

  // Dynamically create fields
  createField(StaticEntity, "valueAsString", "string", function () {
    return String(this.dataEntity.value);
  });
  createField(
    StaticEntity,
    "valueAsFloat",
    "float",
    function () {
      const number = Number(this.dataEntity.value);
      return Number.isNaN(number) ? null : number;
    },
    { nullable: true }
  );
  createField(StaticEntity, "valueAsBoolean", "boolean", function () {
    return Boolean(this.dataEntity.value);
  });

  // Create Resolver
  @Resolver(() => TransformedData)
  class StaticResolver extends createBaseResolver<any, any>(
    StaticEntity,
    new StaticProvider(entityName, data)
  ) {}

  setName(StaticResolver, `${entityName}Resolver`);

  return StaticResolver;
};
