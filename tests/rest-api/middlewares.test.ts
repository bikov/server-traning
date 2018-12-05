// import { errorHandlerMiddleware } from '../../src/helpers/middlewares';
// import { Context } from 'koa';
// import ApiError from '../../src/helpers/api-error';
//
// describe('error handler', () => {
//     test('do nothing if there no error in inner middleware', async () => {
//         const ctx = {};
//
//         const next = jest.fn(() => {
//             expect(ctx).toMatchSnapshot();
//         });
//
//         await expect(errorHandlerMiddleware(ctx as any, next)).resolves.toBeUndefined();
//         expect(next).toHaveBeenCalledTimes(1);
//         expect(ctx).toMatchSnapshot();
//     });
//
//     test('set response to generic error for general error', async () => {
//         const ctx = {} as Context;
//
//         const next = jest.fn(() => {
//             expect(ctx).toMatchSnapshot();
//             throw Error('some generic error');
//         });
//
//         await expect(errorHandlerMiddleware(ctx as any, next)).resolves.toBeUndefined();
//         expect(next).toHaveBeenCalledTimes(1);
//         expect(ctx.status).toEqual(500);
//         expect(ctx.body).toContain('Internal server error, please connect us to support');
//     });
//
//     test('set response from api error to API-ERROR', async () => {
//         const ctx = {} as Context;
//
//         const someApiError = 'some api error';
//         const next = jest.fn(() => {
//             expect(ctx).toMatchSnapshot();
//             throw new ApiError(someApiError,357);
//         });
//
//         await expect(errorHandlerMiddleware(ctx as any, next)).resolves.toBeUndefined();
//         expect(next).toHaveBeenCalledTimes(1);
//         expect(ctx.status).toEqual(357);
//         expect(ctx.body).toContain(someApiError);
//     });
// });