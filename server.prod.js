import "babel-polyfill";
import express from 'express';
import bodyParser from 'body-parser';
import router from './server/routes';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json()); // for parsing application/json
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'server/index.html'));
});

app.use('/api', router);

app.listen(port);
