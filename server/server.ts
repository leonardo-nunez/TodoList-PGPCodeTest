import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { readFile, writeFile } from 'fs/promises';

dotenv.config();

interface ITodo {
  id: number;
  text: string;
  complete: boolean;
}

interface IList {
  id: number;
  name: string;
  todos: ITodo[];
}

const app: Express = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});

app.get('/lists', async (_req: Request, res: Response) => {
  const data = await readFile('./data/lists.json');
  const str = data.toString();
  const json = JSON.parse(str);
  return res.status(200).json(json);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
