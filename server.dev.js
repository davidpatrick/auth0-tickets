import "babel-polyfill";
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.dev.config.babel';

const app = express();
const port = process.env.PORT || 3000;
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('*', function(req, res) {
  res.json({
    'route': 'Sorry this page does not exist!'
  });
});

app.listen(port);
console.log('Server is Up and Running at Port : ' + port);