import Application = require('koa');
import { ApolloServer } from 'apollo-server-koa';
import { Server as HttpServer } from 'http';

import { schemas } from './schemas';
import { resolvers } from './resolvers';
import logger from '../../helpers/logger';

export const setUpGraphql = (app: Application, server: HttpServer) => {

    const aplloServer = new ApolloServer({
        typeDefs: schemas,
        resolvers,
        formatError: (error) => {
            logger.error('GraphQl server error: ', error);
            return new Error('Internal server error');
        },
    });

    aplloServer.applyMiddleware({app});
    aplloServer.installSubscriptionHandlers(server);
};


