import { Context } from 'koa';
import ApiError from './api-error';
import { setResult } from './koa-helper';
import logger from './logger';

export const errorHandlerMiddleware = async (ctx: Context, next) => {
    try {
        await next();
    } catch (err) {
        if (err instanceof ApiError) {
            logger.warn('sending error to client', err);
            setResult(ctx, err.status, err.message);
        } else {
            logger.error(
                `uncaught error in middleware, method: '${ctx.method}', url: '${ctx.url}',\n
             params: '${JSON.stringify(ctx.params)}', body: '${JSON.stringify(
                    ctx.request && ctx.request.body,
                )}', query: '${JSON.stringify(ctx.request && ctx.request.query)}'`,
                err,
            );
            ctx.status = 500;
            ctx.body =
                process.env.NODE_ENV === 'develop'
                    ? err.message
                    : 'Internal server error, please connect us to support';
        }
    }
};

export const loggerMiddleware = async (ctx: Context, next) => {
    const start = new Date().getTime();
    logger.info(`---> got ${ctx.method}' request to '${ctx.url}'`);
    await next();
    const ms = new Date().getTime() - start;
    logger.info(`<---  '${ctx.method}' request to '${ctx.url}' took '${ms}ms'`);
};
