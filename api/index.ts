import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as post from './controller/post';

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compress());

app.post('/post/create', post.create);
app.get('/post/list', post.list);
app.delete('/post/delete', post.remove);
app.patch('/post/update', post.update);

const server = http.createServer(app).listen(8501);

export default server;
