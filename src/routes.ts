import { Application, Router } from 'express';
import { PingController } from './controllers/Ping.controller';
import { UserController } from './controllers/User.controller';
import { MagicLinkController } from './controllers/auth/MagicLink.controller';

type RouteTypes = [string, Router];

const routeList: RouteTypes[] = [
    ['/ping', PingController],
    ['/users', UserController],
    ['/auth/magic-link', MagicLinkController]
];

export const routes = (app: Application): void => {
    routeList.forEach(([url, ...rest]) => {
        app.use(url, rest);
    });
};
