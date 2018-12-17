import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProduct,
    updateProduct,
} from '../../../dal/repositories/products-repository';
import { EVENTS, pubsub } from '../subscriptions';

export const productResolvers = {
    Query: {
        product: (parent, { id }: { id: number }) => getProduct(id),
        products: getAllProducts,
    },
    Product: {
        id: product => product.id.toString(),
    },
    Mutation: {
        createProduct: async (parent, { product }) => {
            const createdProduct = await createProduct(product);
            pubsub.publish(EVENTS.PRODUCTS.PRODUCT_CREATED, {
                productCreated: { product: createdProduct },
            });
            return createdProduct;
        },
        deleteProduct: async (parent, { id }) => {
            await deleteProduct({ id });
            pubsub.publish(EVENTS.PRODUCTS.PRODUCT_DELETED, { productDeleted: { id } });
            return { id };
        },
        updateProduct: async (parent, { id, updateObject }) => {
            const ressult = await updateProduct(id, updateObject);
            pubsub.publish(EVENTS.PRODUCTS.PRODUCT_UPDATED, {
                productUpdated: { product: await getProduct(id) },
            });
            return ressult;
        },
    },
    Subscription: {
        productCreated: {
            subscribe: () => pubsub.asyncIterator(EVENTS.PRODUCTS.PRODUCT_CREATED),
        },
        productDeleted: {
            subscribe: () => pubsub.asyncIterator(EVENTS.PRODUCTS.PRODUCT_DELETED),
        },
        productUpdated: {
            subscribe: () => pubsub.asyncIterator(EVENTS.PRODUCTS.PRODUCT_UPDATED),
        },
    },
};
