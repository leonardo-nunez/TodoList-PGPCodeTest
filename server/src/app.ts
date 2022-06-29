import express from 'express';
import cors from 'cors';
import { Request, Response, Application } from 'express';
import { readFile, writeFile } from 'fs/promises';

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

const port = 3030;
const app: Application = express();
app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World?!?!!!!!');
});

app.get('/lists', async (_req: Request, res: Response) => {
  const data = await readFile('./data/lists.json');
  const str = data.toString();
  const json = JSON.parse(str);
  return res.status(200).json(json);
});

app.post('/lists', async (req: Request, res: Response) => {
  console.log('POSTING!');
  console.log(req.body);

  await writeFile('./data/lists.json', JSON.stringify(req.body));

  return res.status(200);
});

// app.post('/api/puppies', async (req: Request, res: Response) => {
//   const newPuppy: IPuppy = {
//     id: Number.parseInt(req.body.id as string),
//     name: req.body.name,
//     breed: req.body.breed,
//     birthDate: req.body.birthDate,
//   };
//   const json = await readFileData(filePath);
//   json.push(newPuppy);
//   await writeFile('./data/puppies.json', JSON.stringify(json));

//   res.status(201).json(newPuppy);
// });

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
