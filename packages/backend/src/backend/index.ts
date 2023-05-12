import "reflect-metadata";
import GraphweaverApollo from "@exogee/graphweaver-apollo";
import {
  handlers,
  startServerAndCreateLambdaHandler,
} from "@as-integrations/aws-lambda";

import GraphweaverAppKVStore from "@kyedoesdev/graphweaver-app-kv-store";

const app = new GraphweaverAppKVStore({
  name: "test",
  data: {
    hello: "world",
    its: 42,
    nope: false,
  },
});

const graphweaver = new GraphweaverApollo({
  resolvers: [...app.resolvers()],
  adminMetadata: { enabled: true },
  mikroOrmOptions: [],
});

export const handler = startServerAndCreateLambdaHandler(
  graphweaver.server,
  handlers.createAPIGatewayProxyEventRequestHandler(),
  {}
);
