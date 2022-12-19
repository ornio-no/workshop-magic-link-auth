import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();
const port = 6001;

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ data: 'Hello from us! ...' });
});

app.listen(port, () => console.log(`Server is listing on port:${port}`));
