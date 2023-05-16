import "reflect-metadata";
import GraphweaverApollo from "@exogee/graphweaver-apollo";
import {
  handlers,
  startServerAndCreateLambdaHandler,
} from "@as-integrations/aws-lambda";
import { faker } from "@faker-js/faker";

import { system } from "./system";
import { article, personProfile, link } from "./contentful";

const graphweaver = new GraphweaverApollo({
  resolvers: [
    system.resolver,
    article.resolver,
    personProfile.resolver,
    link.resolver,
  ],
  adminMetadata: { enabled: true },
  mikroOrmOptions: [],
});

export const handler = startServerAndCreateLambdaHandler(
  graphweaver.server,
  handlers.createAPIGatewayProxyEventRequestHandler(),
  {}
);
