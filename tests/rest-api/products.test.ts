import request from 'supertest';
import { config } from 'dotenv';

beforeAll(() => {
    config();
    // return new Promise((resolve) => {
    //     appEvents.on('ready', resolve);
    // });
});

describe('GET all', () => {

    test('do nothing if there no error in inner middleware', async () => {
        const mockGetAllProducts = jest.fn(() => {
        });
        jest.mock('../../src/dal/repositories/products-repository', () => jest.fn().mockImplementation(() => {
            return {getAllProducts: mockGetAllProducts};
        }));
        const {app } = require( '../../src');
        const response = await request(app.callback()).get('/products');
        expect(response.status).toBe(200);
        expect(response.body).toBe(200);
        expect(mockGetAllProducts).toBeCalledTimes(1);
    });
});