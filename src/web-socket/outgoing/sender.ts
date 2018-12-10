import logger from '../../helpers/logger';
import { Socket } from 'socket.io';
import ProductDto from '../../dal/dto/product-dto';
import { eventNames } from '../event-names';

function sendToClient(client: Socket, eventName: string, objectToSend: any, {allowEmpty = false} = {}) {
    if (!client || (!objectToSend && !allowEmpty)) {
        logger.error(`unnable to send ${eventName} to user because ${client ? `'object to send'` : `'client'`} is undefined`);
    } else {
        logger.info(`---> sending socket.io message, event name: '${eventName}', object: '${JSON.stringify(objectToSend)}'`);
        client.emit(eventName, objectToSend);
    }
}

export const sendProducts = (client: Socket, products: ProductDto[]) => {
    sendToClient(client, eventNames.products, products);
};

export const sendNonceResultToClient = (client, nonce, result) => {
    sendToClient(client, eventNames.nonceResult, {nonce, answer: result});
};