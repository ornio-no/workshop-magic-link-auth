import { Application, Router } from 'express';
import { PingController } from './controllers/Ping.controller';

type RouteTypes = [string, Router];

const routeList: RouteTypes[] = [['/ping', PingController]];

export const routes = (app: Application): void => {
    routeList.forEach(([url, ...rest]) => {
        app.use(url, rest);
    });
};
