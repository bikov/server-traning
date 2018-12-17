import { ApolloServer } from 'apollo-server-koa';
import { Server as HttpServer } from 'http';
import Application = require('koa');

import logger from '../../helpers/logger';
import { resolvers } from './resolvers';
import { schemas } from './schemas';

export const setUpGraphql = (app: Application, server: HttpServer) => {
    const aplloServer = new ApolloServer({
        typeDefs: schemas,
        resolvers,
        formatError: error => {
            logger.error('GraphQl server error: ', error);
            return new Error('Internal server error');
        },
    });

    aplloServer.applyMiddleware({ app });
    aplloServer.installSubscriptionHandlers(server);
};
