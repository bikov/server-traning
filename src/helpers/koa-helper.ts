import { Context } from 'koa';

export const setResult = (ctx: Context, status: number, body: any) => {
    ctx.status = status;
    ctx.body = body;
};