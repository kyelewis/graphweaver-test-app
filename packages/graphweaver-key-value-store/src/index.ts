import { createResolver, createProvider }from "@exogee/graphweaver-helpers";

type Value = string | number | boolean;

type Data = (() => Record<string, Value>) | Record<string, Value>;

export interface Options<D extends Data> {
  name: string;
  data: D;
}

export const createSimpleKeyValueStore = <D>({
  name,
  data: dataOrDataFn,
}: Options<D>) => {
  const data =
    typeof dataOrDataFn === "function" ? dataOrDataFn : () => dataOrDataFn;

  const transformedData = () =>
    Object.entries(data()).map(([id, value]) => ({
      id,
      value,
    }));

  return createResolver({
    name,
    fields: [
      {
        name: "valueAsString",
        type: "string",
        resolve: (data) => String(data?.value),
      },
      {
        name: "valueAsFloat",
        type: "float",
        resolve: (data) => {
          const number = Number(data?.value);
          return Number.isNaN(number) ? null : number;
        },
      },
      {
        name: "valueAsBoolean",
        type: "boolean",
        resolve: (data) => Boolean(data?.value),
      },
    ],
    provider: createProvider({
      backendId: `KeyValueStore`,
      read: (filter) => {
        if (filter?.id) {
          return transformedData().find((item) => item.id === filter.id);
        } else {
          return transformedData();
        }
      },
    }),
  });
};
