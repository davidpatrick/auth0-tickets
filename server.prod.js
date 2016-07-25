import "babel-polyfill";
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('*', function(req, res) {
  res.json({
    'route': 'Sorry this page does not exist!'
  });
});

app.listen(port);