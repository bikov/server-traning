import * as HttpStatus from 'http-status-codes';
import * as Joi from 'joi';
import { Context } from 'koa';

import * as productsFacade from '../../dal/repositories/products-repository';
import { setResult } from '../../helpers/koa-helper';
import logger from '../../helpers/logger';
import { validateArr } from '../../helpers/validator';

const processShopSchema = Joi.object().keys({
    id: Joi.string().required(),
    amount: Joi.number()
        .integer()
        .positive()
        .required(),
});

export const processShopping = async (ctx: Context) => {
    const { error } = validateArr(ctx.request.body, processShopSchema);
    if (error) {
        logger.info('unable to process shopping due validation error: \t', error);
        setResult(ctx, HttpStatus.BAD_REQUEST, error.message);
    } else {
        try {
            await productsFacade.changeProductsAmount(ctx.request.body as any);
            setResult(ctx, HttpStatus.OK, 'Modified');
        } catch (e) {
            logger.warn('unable to process shopping because, ', e);
            ctx.throw(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
