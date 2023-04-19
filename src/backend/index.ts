import GraphweaverApollo from '@exogee/graphweaver-apollo';
//import { startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';

const graphweaver = new GraphweaverApollo({
	resolvers: [],
	adminMetadata: { enabled: true },
	mikroOrmOptions: []
});

//export const handler = startServerAndCreateLambdaHandler(graphweaver.server, {});
