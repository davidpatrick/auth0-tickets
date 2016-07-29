import "babel-polyfill";
import express from 'express';
import bodyParser from 'body-parser';
import router from './server/routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json()); // for parsing application/json
app.use('/', router);

app.listen(port);
