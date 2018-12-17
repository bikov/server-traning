import { Server } from 'socket.io';
import logger from '../helpers/logger';
import { listenToEvents } from './incoming';
import { sendInitiateData } from './outgoing';

export const setUpWSServer = (io: Server) => {
    io.on('connection', socekt => {
        socekt.use((packet, next) => {
            logger.info(
                `<--- got socket.io message, event name: '${packet[0]}', data: '${JSON.stringify(
                    packet.slice(1),
                )}'`,
            );
            return next();
        });
        listenToEvents(socekt);
        sendInitiateData(socekt);
    });
};
