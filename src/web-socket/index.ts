import { Server } from 'socket.io';
import { sendInitiateData } from './outgoing';
import { listenToEvents } from './incoming';
import logger from '../helpers/logger';

export const setUpWSServer = (io: Server) => {
    io.on('connection', (socekt) => {
        socekt.use(((packet, next) => {
            logger.info(`<--- got socket.io message, event name: '${packet[0]}', data: '${JSON.stringify(packet.slice(1))}'`);
            return next();
        }));
        listenToEvents(socekt);
        sendInitiateData(socekt);
    });
};