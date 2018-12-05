import * as winston from 'winston';

const errorStackTracerFormat = winston.format(info => {
    if (info.meta && info.meta instanceof Error) {
        info.message = `${info.message} ${info.meta.stack}`;
    }

    return info;
});

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.splat(), // This is necessary to produce the 'meta' attribute
        errorStackTracerFormat(),
        winston.format.simple(),
    ),
    level: 'debug',
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),

        }),
    ],
});

export default logger;