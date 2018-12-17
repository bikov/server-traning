import { Socket } from 'socket.io';
import * as productsFacade from '../../dal/repositories/products-repository';
import { eventNames } from '../event-names';
import { sendNonceResultToClient, sendProducts } from '../outgoing/sender';

export const listenToEvents = (client: Socket) => {
    client.on(eventNames.deleteProduct, async id => {
        await productsFacade.deleteProduct({ id });
        sendProducts(client, await productsFacade.getAllProducts());
    });

    client.on(eventNames.createProduct, async product => {
        await productsFacade.createProduct(product);
        sendProducts(client, await productsFacade.getAllProducts());
    });

    client.on(eventNames.updateProduct, async ({ nonce, value }) => {
        try {
            const result = await productsFacade.updateProduct(value.id, value.changes);
            sendNonceResultToClient(client, nonce, { changed: result.modified > 0, error: false });
            sendProducts(client, await productsFacade.getAllProducts());
        } catch (e) {
            sendNonceResultToClient(client, nonce, { changed: 0, error: true });
        }
    });
};
