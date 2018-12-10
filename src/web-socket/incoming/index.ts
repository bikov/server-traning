import { Socket } from 'socket.io';
import { createProduct, deleteProduct, updateProduct } from '../../dal/repositories/products-repository';
import { sendNonceResultToClient, sendProducts } from '../outgoing/sender';
import * as productsFacade from '../../dal/repositories/products-repository';
import { eventNames } from '../event-names';

export const listenToEvents = (client: Socket) => {
    client.on(eventNames.deleteProduct, async (id) => {
        await deleteProduct({id});
        sendProducts(client, await productsFacade.getAllProducts());
    });

    client.on(eventNames.createProduct, async (product) => {
        await createProduct(product);
        sendProducts(client, await productsFacade.getAllProducts());
    });

    client.on(eventNames.updateProduct, async ({nonce, value}) => {
        try {
            const result = await updateProduct(value.id, value.changes);
            sendNonceResultToClient(client, nonce, {changed: result.modified > 0, error: false});
            sendProducts(client, await productsFacade.getAllProducts());
        } catch (e) {
            sendNonceResultToClient(client, nonce, {changed: 0, error: true});
        }
    });

};