import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src/index'),
    'webpack-hot-middleware/client?reload=true',
  ],
  output: {
    filename: 'bundle.js',
    path: '/',
    publicPath: '/',
  },
  module: {
    loaders: [{
      test: /\.js$|\.jsx$|\.es6$|\.babel$/,
      loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react'],
      exclude:  /(node_modules)/,
      include: path.join(__dirname, 'src'),
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": { 
         NODE_ENV: JSON.stringify("development") 
       }
    }),
    new webpack.EnvironmentPlugin([]),
    new HtmlWebpackPlugin({template: 'index.html'}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  target: 'web',
};