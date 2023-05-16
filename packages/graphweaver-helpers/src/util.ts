import { Float, Field } from "type-graphql";
import { ReadOnly } from "@exogee/graphweaver";

export const caps = (value: string): string =>
  `${value.charAt(0).toUpperCase()}${value.slice(1)}`;

export const setNameOnClass = (target: any, name: string) =>
  Object.defineProperty(target, "name", { value: name });

export const createFieldOnClass = (
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

export const setClassReadOnly = (target: any) => ReadOnly(target.prototype);

export const typeFunctionForType = (
  type: "string" | "float" | "boolean"
): any => {
  switch (type) {
    case "string":
      return () => String;
    case "float":
      return () => Float;
    case "boolean":
      return () => Boolean;
  }
};

