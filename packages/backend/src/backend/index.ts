import "reflect-metadata";
import GraphweaverApollo from "@exogee/graphweaver-apollo";
import {
  handlers,
  startServerAndCreateLambdaHandler,
} from "@as-integrations/aws-lambda";

import GraphweaverSimpleKeyValueStore from "@kyedoesdev/graphweaver-simple-key-value-store";

const testKeyValueStore = new GraphweaverSimpleKeyValueStore({
  name: "test",
  data: () => {
    return {
      hello: "world",
      its: 42,
      nope: false,
      current_server_time: Date.now(),
    };
  },
});

const graphweaver = new GraphweaverApollo({
  resolvers: [...testKeyValueStore.resolvers()],
  adminMetadata: { enabled: true },
  mikroOrmOptions: [],
});

export const handler = startServerAndCreateLambdaHandler(
  graphweaver.server,
  handlers.createAPIGatewayProxyEventRequestHandler(),
  {}
);
