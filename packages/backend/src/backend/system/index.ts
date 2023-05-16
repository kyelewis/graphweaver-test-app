import { createSimpleKeyValueStore } from "@exogee/graphweaver-key-value-store";

export const system = createSimpleKeyValueStore({
  name: "system",
  data: () => {
    return {
      node_version: process.version,
      current_server_time: Date.now(),
    };
  },
});
