import "reflect-metadata";
import GraphweaverApollo from "@exogee/graphweaver-apollo";
import {
  handlers,
  startServerAndCreateLambdaHandler,
} from "@as-integrations/aws-lambda";
import { faker } from "@faker-js/faker";

import { system } from "./system";
import { contentfulArticle, contentfulPersonProfile, contentfulLink} from "./contentful";

const graphweaver = new GraphweaverApollo({
  resolvers: [
    ...system.resolvers(),
    ...contentfulArticle.resolvers(),
    ...contentfulPersonProfile.resolvers(),
    ...contentfulLink.resolvers(),
  ],
  adminMetadata: { enabled: true },
  mikroOrmOptions: [],
});

export const handler = startServerAndCreateLambdaHandler(
  graphweaver.server,
  handlers.createAPIGatewayProxyEventRequestHandler(),
  {}
);
