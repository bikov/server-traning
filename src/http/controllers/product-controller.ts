import { Context } from 'koa';
import * as HttpStatus from 'http-status-codes';
import * as Joi from 'joi';

import * as productsFacade from '../../dal/repositories/products-repository';
import { validate } from '../../helpers/validator';
import { setResult } from '../../helpers/koa-helper';
import logger from '../../helpers/logger';

export const getProducts = async (ctx: Context) => {
    try {
        setResult(ctx, HttpStatus.OK, await productsFacade.getAllProducts());
    } catch (e) {
        logger.warn('unable to get all products because, ', e);
        ctx.throw(HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

const createProductSchema = {
    name: Joi.string().min(2).max(30).required(),
    description: Joi.string(),
    price: Joi.number().positive().required(),
    imageName: Joi.string().required(),
    amount: Joi.number().integer().positive().required(),
};

export const createProduct = async (ctx: Context) => {
    const {error} = validate(ctx.request.body, createProductSchema);
    if (error) {
        logger.info('cannot create product because validation failed', error);
        setResult(ctx, HttpStatus.BAD_REQUEST, error.message);
    } else {
        try {
            setResult(ctx, HttpStatus.OK, await productsFacade.createProduct(ctx.request.body as any));
        } catch (e) {
            logger.warn('unable to create product because, ', e);
            ctx.throw(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};

export const deleteProduct = async (ctx: Context) => {
    const {error} = validate(ctx.params, {id: Joi.string().required()});
    if (error) {
        logger.info('cannot delete product because validation failed', error);
        setResult(ctx, HttpStatus.BAD_REQUEST, error.message);
    } else {
        try {
            await productsFacade.deleteProduct(ctx.params);
            setResult(ctx, HttpStatus.OK, 'deleted');
        } catch (e) {
            logger.warn('unable to delete product because, ', e);
            ctx.throw(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};

const updateProductSchema = {
    name: Joi.string().min(2).max(30),
    description: Joi.string(),
    price: Joi.number().positive(),
    imageName: Joi.string(),
    amount: Joi.number().integer().positive(),
};

export const updateProduct = async (ctx: Context) => {
    const error = validate(ctx.params, {id: Joi.string().required()}).error || validate(ctx.request.body, updateProductSchema).error;
    if (error) {
        logger.info('cannot update product because validation failed', error);
        setResult(ctx, HttpStatus.BAD_REQUEST, error.message);
    } else {
        try {
            const productId = ctx.params.id;
            const {found, modified} = await productsFacade.updateProduct(productId, ctx.request.body);
            if (found < 1) {
                setResult(ctx, HttpStatus.NOT_FOUND, `Product by id '${productId}' not found`);
            } else if (modified < 1) {
                setResult(ctx, HttpStatus.NOT_MODIFIED, 'Nothing to change');
            } else {
                setResult(ctx, HttpStatus.OK, 'Modified');
            }
        } catch (e) {
            logger.warn('unable to create update because, ', e);
            ctx.throw(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};

export const getProduct = async (ctx: Context) => {
    const {error} = validate(ctx.params, {id: Joi.string().required()});
    if (error) {
        logger.info('cannot find product because validation failed', error);
        setResult(ctx, HttpStatus.BAD_REQUEST, error.message);
    } else {
        try {
            setResult(ctx, HttpStatus.OK, await productsFacade.getProduct(ctx.params.id));
        } catch (e) {
            logger.warn('unable to get product because, ', e);
            ctx.throw(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
