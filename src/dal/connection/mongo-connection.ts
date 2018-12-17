import mongoose from 'mongoose';
import logger from '../../helpers/logger';

mongoose.set('debug', true);

// flag for auto connect on disconnect
let wantToDisconnect = false;

// flag for subscribe to connection event only one time
let isSubscribed = false;

// connection string to reconnect
let conString;

export async function initConnection(connectionString) {
    conString = connectionString;
    wantToDisconnect = false;
    await subscribeToEvents(mongoose.connection);
    await connect(connectionString);
}

export async function closeConnection() {
    return new Promise(resolve => {
        wantToDisconnect = true;
        mongoose.connection.close(true, () => {
            logger.error('Mongoose connection closed');
            resolve();
        });
    });
}

async function subscribeToEvents(db) {
    if (!isSubscribed) {
        db.on('connecting', () => {
            logger.info('connecting to MongoDB...');
        });
        db.on('error', async error => {
            logger.error(`Error in MongoDb connection: '${error}'`);
        });
        db.on('connected', () => {
            logger.info('MongoDB connected!');
        });
        db.on('open', () => {
            logger.info('MongoDB connection opened!');
        });
        db.on('reconnected', () => {
            logger.warn('MongoDB reconnected!');
        });
        db.on('disconnected', async () => {
            if (!wantToDisconnect) {
                logger.error('MongoDB disconnected!');
                await connect(conString);
            }
        });
        isSubscribed = true;
    }
}

async function connect(connectionString) {
    await mongoose.connect(
        connectionString,
        {
            autoReconnect: true,
            socketTimeoutMS: 0,
            keepAlive: 60000,
            useNewUrlParser: true,
        },
    );
}
