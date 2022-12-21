import { Application, Router } from 'express';
import { PingController } from './controllers/Ping.controller';
import { UserController } from './controllers/User.controller';

type RouteTypes = [string, Router];

const routeList: RouteTypes[] = [
    ['/ping', PingController],
    ['/users', UserController]
];

export const routes = (app: Application): void => {
    routeList.forEach(([url, ...rest]) => {
        app.use(url, rest);
    });
};
