import 'reflect-metadata';
import GraphweaverApollo from '@exogee/graphweaver-apollo';
import { handlers, startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';

console.log(process.env);

const graphweaver = new GraphweaverApollo({
	resolvers: [],
	adminMetadata: { enabled: true },
	mikroOrmOptions: []
});

export const handler = startServerAndCreateLambdaHandler(
	graphweaver.server, 
    handlers.createAPIGatewayProxyEventRequestHandler(),
{});

