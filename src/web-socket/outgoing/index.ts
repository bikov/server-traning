import { Socket } from 'socket.io';
import * as productsFacade from '../../dal/repositories/products-repository';
import { sendProducts } from './sender';

export const sendInitiateData = async (client: Socket) => {
    sendProducts(client, await productsFacade.getAllProducts());
};
