import * as express from 'express';
import * as http from 'http';
import { mongo } from '../mongo';
import routes from './services/post';

const app: express.Application = express();

app.use(routes);

async function startServer() {
  await mongo.connect();
  const server = http.createServer(app).listen(8500);
  return server;
}

export default startServer();
