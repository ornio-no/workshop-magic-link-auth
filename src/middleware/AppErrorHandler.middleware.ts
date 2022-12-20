import { Request, Response } from 'express';

export const appErrorHandlerMiddleware = (req: Request, res: Response): void => {
    res.status(404).send({ error: 'Not found!' });
};
