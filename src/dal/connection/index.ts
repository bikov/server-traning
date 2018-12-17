import logger from '../../helpers/logger';
import * as mongoConnection from './mongo-connection';

export const connectAll = async ({ mongoConnectionString }: { mongoConnectionString: string }) => {
    logger.info('dal connection to all connections');
    return mongoConnection.initConnection(mongoConnectionString);
};
