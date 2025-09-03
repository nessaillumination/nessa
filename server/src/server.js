import app from './app.js';
import config from './config/config.js';
import { initRateLimiter } from './config/rateLimiter.js';
import databaseService from './service/databaseService.js';
import logger from './util/logger.js';
import { promisify } from 'util';

const server = app.listen(config.PORT);
const closeServer = promisify(server.close.bind(server));

async function shutdown(server, logger, error) {
    logger.error('APPLICATION_ERROR', { meta: { message: error.message, stack: error.stack } });

    try {
        await closeServer();
        logger.info('SERVER_CLOSED');
    } catch (closeError) {
        logger.error('SERVER_SHUTDOWN_ERROR', { meta: closeError });
    } finally {
        process.exit(1);
    }
}

(async () => {
    try {
        const connection = await databaseService.connect();
        logger.info('DATABASE_CONNECTION', {
            meta: {
                CONNECTION_NAME: connection.name,
            },
        });

        connection.on('error', (err) => {
            logger.error('MONGODB_ERROR', { 
                meta: { 
                    message: err.message, 
                    stack: err.stack,
                    timestamp: new Date(),
                }, 
            });
        });

        connection.on('disconnected', () => {
            logger.warn('MONGODB_DISCONNECTED', {
                meta: { timestamp: new Date() },
            });
        });

        connection.on('reconnected', () => {
            logger.info('MONGODB_RECONNECTED', {
                meta: { timestamp: new Date() },
            });
        });

        initRateLimiter(connection);
        logger.info('RATE_LIMITER_INITIATED');

        logger.info('APPLICATION_STARTED', {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL,
                ENVIRONMENT: config.ENV,
            },
        });
    } catch (err) {
        await shutdown(server, logger, err);
    }
})();

process.on('SIGINT', () => {
    logger.info('SIGINT_RECEIVED', { meta: { timestamp: new Date() } });
    shutdown(server, logger, new Error('SIGINT received'));
});

process.on('SIGTERM', () => {
    logger.info('SIGTERM_RECEIVED', { meta: { timestamp: new Date() } });
    shutdown(server, logger, new Error('SIGTERM received'));
});
