import Application from 'koa';
import bodyparser from 'koa-bodyparser';
import json = require('koa-json');
import Router from 'koa-router';

import { Server as HttpServer } from 'http';
import { connectAll } from '../dal/connection';
import { errorHandlerMiddleware, loggerMiddleware } from '../helpers/middlewares';
import { healthController, versionController } from './controllers/common-controller';
import { setUpGraphql } from './graphql';
import { setRouters } from './routes';

export const setUpHttpServer = (app: Application, server: HttpServer) => {
    app.use(errorHandlerMiddleware);

    app.use(
        bodyparser({
            enableTypes: ['json', 'form', 'text'],
        }),
    );
    app.use(json());

    // dal connection
    // let isDalConnected = false;
    // app.use(async (ctx, next) => {
    //     if (!isDalConnected) {
    //         ctx.status = 503;
    //     } else {
    //         await next();
    //     }
    // });

    connectAll({ mongoConnectionString: process.env.MONGO_CONNECTION as string });
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

    // inflate loggedRouter with all routes
    const loggedRouter = new Router();
    setRouters(loggedRouter);
    app.use(loggedRouter.allowedMethods()).use(loggedRouter.routes());

    setUpGraphql(app, server);
};
