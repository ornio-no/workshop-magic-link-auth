import express, { Application } from 'express';
import { routes } from './routes';
import { appErrorHandlerMiddleware } from './middleware/AppErrorHandler.middleware';
import { CorsMiddleware } from './middleware/Cors.middleware';

export const app: Application = express();

app.use(CorsMiddleware);
app.use(express.json());

routes(app);

app.use(appErrorHandlerMiddleware);
