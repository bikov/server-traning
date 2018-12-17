import * as fs from 'fs';
import { Context } from 'koa';
import * as path from 'path';
import { setResult } from '../../helpers/koa-helper';

export const healthController = async (ctx: Context) => setResult(ctx, 200, 'OK');

export const versionController = async (ctx: Context) => {
    return new Promise(resolve => {
        const pjs = require('./../../package');
        fs.stat(path.join(__dirname, '../../', 'package.json'), (err, stat) => {
            if (err) {
                setResult(ctx, 500, err.message);
            } else {
                setResult(ctx, 200, { version: pjs.version, date: stat.mtime });
            }
            resolve();
        });
    });
};
