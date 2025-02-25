import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use((req: Request, res: Response, next) => {
  console.log(`[server]: ${req.method} ${req.url}`);
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/users/:userId', (req: Request, res: Response) => {
  res.send(`User ID: ${req.params.userId}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
