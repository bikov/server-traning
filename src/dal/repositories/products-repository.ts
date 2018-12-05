import { Product } from '../models/product';
import logger from '../../helpers/logger';
import ProductDto from '../dto/product-dto';
import ApiError from '../../helpers/api-error';

export const getAllProducts = async () => (await Product.find({})).map(foundProduct => new ProductDto(foundProduct));

export const createProduct = async ({name, description, price, imageName, amount}) => {

    const newProduct = new Product({
        name,
        description,
        price,
        imageName,
        amount,
    });
    try {
        return new ProductDto(await newProduct.save());
    } catch (e) {
        logger.warn('unable to create product because: ', e);
    }
};

export const deleteProduct = async ({id}) => {
    const result = await Product.deleteOne({_id: id});
    if (result.n !== 1) {
        logger.warn(`unable to delete product by id: '${id}'. result is: \n${JSON.stringify(result)}`);
        throw new Error(`cannot remove product by id: '${id}'`);
    }
};

export const updateProduct = async (id, updateObject) => {
    const result = await Product.updateOne({_id: id}, {$set: updateObject});
    if (!result.ok) {
        logger.warn(`unable to update product by id: '${id}'. result is: \n${JSON.stringify(result)}`);
        throw new Error(`cannot update product by id: '${id}'`);
    }
    return {found: result.n, modified: result.nModified};
};

export const getProduct = async (id) => {
    const foundProduct = await Product.findOne({_id: id});
    if (!foundProduct) {
        logger.warn(`unable to find product by id: '${id}'`);
        throw new ApiError('Not Found', 404);
    } else {
        return new ProductDto(foundProduct);
    }
};

export const changeProductsAmount = async (checkedAmounts: [{ id: string, amount: number }]) => {
    const results = await Promise.all(checkedAmounts.map(async ({id, amount}) => {
        const result = await Product.updateOne({_id: id}, {$inc: {amount: (amount * -1)}});
        return {ok: result.ok, id, amount};
    }));
    if (results.some(result => !result.ok)) {
        logger.error('some error occurred while updating product amounts, results: \t', results);
        throw new Error('some error occurred while updating product amounts');
    }
};