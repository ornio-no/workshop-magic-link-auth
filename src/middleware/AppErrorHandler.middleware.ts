import { Request, RequestHandler, Response } from 'express';

export const appErrorHandlerMiddleware = (async (req: Request, res: Response) => {
    res.status(404).send({ error: 'Not found!' });
}) as RequestHandler;
