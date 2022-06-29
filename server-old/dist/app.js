"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const promises_1 = require("fs/promises");
const port = 3030;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', (_req, res) => {
    res.send('Hello World! BAM!');
});
app.get('/lists', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, promises_1.readFile)('./data/lists.json');
    const str = data.toString();
    const json = JSON.parse(str);
    return res.status(200).json(json);
}));
app.post('/lists', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('POSTING!');
    console.log(req.body);
    yield (0, promises_1.writeFile)('./data/lists.json', JSON.stringify(req.body));
    return res.status(200);
}));
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
//# sourceMappingURL=app.js.map