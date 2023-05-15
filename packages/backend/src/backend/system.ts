import GraphweaverSimpleKeyValueStore from "@kyedoesdev/graphweaver-simple-key-value-store";

export const system = new GraphweaverSimpleKeyValueStore({
  name: "system",
  data: () => {
    return {
      node_version: process.version,
      current_server_time: Date.now(),
    };
  },
});
