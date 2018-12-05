import * as mongoConnection from './mongo-connection';
import logger from '../../helpers/logger';

export const connectAll = (async ({mongoConnectionString}: { mongoConnectionString: string }) => {
    logger.info('dal connection to all connections');
    return mongoConnection.initConnection(mongoConnectionString);
});

export const disconnectAll = (async () => {
    logger.info('dal cosing all connections');
    return mongoConnection.closeConnection();
});