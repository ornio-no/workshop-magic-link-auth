import express, { Application } from 'express';
import { routes } from './routes';
import { appErrorHandlerMiddleware } from './middleware/AppErrorHandler.middleware';

export const app: Application = express();

routes(app);

app.use(appErrorHandlerMiddleware);
