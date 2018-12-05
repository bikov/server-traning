import Koa from 'koa';
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import Router = require('koa-router');

import { config } from 'dotenv';

config();

import { healthController, versionController } from './controllers/common-controller';
import logger from './helpers/logger';
import { setRouters } from './routes';
import { Context } from 'koa';
import { connectAll } from './dal/connection';
import { errorHandlerMiddleware, loggerMiddleware } from './helpers/middlewares';
import { EventEmitter } from 'events';

export const app = new Koa();

app.use(errorHandlerMiddleware);

app.use(bodyparser({
    enableTypes: ['json', 'form', 'text'],
}));
app.use(json());

//dal connection
// let isDalConnected = false;
// app.use(async (ctx, next) => {
//     if (!isDalConnected) {
//         ctx.status = 503;
//     } else {
//         await next();
//     }
// });

connectAll({mongoConnectionString: (<string>process.env.MONGO_CONNECTION)});
// dalEvents.on('connected', () => {
//     console.info('dal initialized');
//     isDalConnected = true;
// });

const unloggedRoutes = new Router();
unloggedRoutes.get('/health', healthController);
unloggedRoutes.get('/v', versionController);

app.use(unloggedRoutes.allowedMethods()).use(unloggedRoutes.routes());

// logger
app.use(loggerMiddleware);

//inflate loggedRouter with all routes
const loggedRouter = new Router();
setRouters(loggedRouter);

app.use(loggedRouter.allowedMethods()).use(loggedRouter.routes());
