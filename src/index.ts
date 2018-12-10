import Koa from 'koa';

import { config } from 'dotenv';
import { setUpHttpServer } from './http';
import * as http from 'http';
import socket from 'socket.io';
import { setUpWSServer } from './web-socket';

config();

export const setUpServers = () => {
    const app = new Koa();

    /**
     * Create HTTP server.
     */
    const server = http.createServer(app.callback());

    /**
     * Create WebSocket server
     */
    const io = socket(server);

    setUpHttpServer(app);
    setUpWSServer(io);

    return server;
};