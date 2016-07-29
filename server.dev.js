import "babel-polyfill";
import express from 'express';
import bodyParser from 'body-parser';
import router from './server/routes';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.dev.config.babel';

const app = express();
const port = process.env.PORT || 3000;
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json()); // for parsing application/json
app.use('/', router);

app.listen(port);
console.log('Server is Up and Running at Port : ' + port);
