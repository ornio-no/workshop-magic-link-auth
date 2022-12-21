import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { AuthService } from '../../services/Auth.service';

export const MagicLinkController: Router = Router();

MagicLinkController.post('/', (async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        const refId = await AuthService.magicLink(email);

        res.status(200).send({ data: refId });
    } catch (e) {
        next(e);
    }
}) as RequestHandler);

MagicLinkController.get('/status/:refId', (async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refId } = req.params;
        const result = await AuthService.status(refId);

        res.status(200).send({ data: result });
    } catch (e) {
        next(e);
    }
}) as RequestHandler);

MagicLinkController.get('/confirm/:token', (async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.params;
        const result = await AuthService.confirm(token);

        res.status(200).send({ data: result });
    } catch (e) {
        next(e);
    }
}) as RequestHandler);
