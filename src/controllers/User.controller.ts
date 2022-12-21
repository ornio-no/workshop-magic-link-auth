import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import UserDbModel from '../models/UserDb.model';

export const UserController: Router = Router();

UserController.get('/', (async (req: Request, res: Response, next: NextFunction) => {
    try {
        await UserDbModel.query().insert({ name: 'Flamur', email: 'flamur.mavraj@ornio.no' });
        res.status(200).send({ data: 'User!' });
    } catch (e) {
        next(e);
    }
}) as RequestHandler);
