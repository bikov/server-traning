import { PubSub } from 'apollo-server';
import * as PRODUCT_EVENTS from './product';

export const EVENTS = {
    PRODUCTS: PRODUCT_EVENTS,
};

export const pubsub = new PubSub();
