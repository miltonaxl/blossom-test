import { ApolloServerPlugin, BaseContext, GraphQLRequestListener } from '@apollo/server';
import { GraphQLRequestContext } from '@apollo/server';

export const requestTimeLoggerMiddleware: ApolloServerPlugin<BaseContext> = {
    async requestDidStart(requestContext: GraphQLRequestContext<BaseContext>): Promise<GraphQLRequestListener<BaseContext>> {
        const start = Date.now();
        const requestListener: GraphQLRequestListener<BaseContext> = {
            willSendResponse(responseContext: GraphQLRequestContext<BaseContext>) {
                const end = Date.now();
                console.log(`Time taken for request: ${end - start}ms`);
                return Promise.resolve();
            },
        };
        return Promise.resolve(requestListener);
    },
};