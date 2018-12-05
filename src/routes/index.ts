import * as Router from 'koa-router';

import * as productController from '../controllers/product-controller';
import * as shoppingCardController from '../controllers/shopping-cart-controller';

export const setRouters = (router: Router) => {
    router.get('/products', productController.getProducts);
    router.post('/products', productController.createProduct);
    router.patch('/products/:id', productController.updateProduct);
    router.delete('/products/:id', productController.deleteProduct);
    router.get('/products/:id', productController.getProduct);
    router.post('/shopping/process', shoppingCardController.processShopping);
};
