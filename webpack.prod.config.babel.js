import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  devtool: '#cheap-module-source-map',
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src/index')
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel?presets[]=es2015,presets[]=react'],
      exclude: /node_modules/,
      include: __dirname,
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": { 
         NODE_ENV: JSON.stringify("production") 
       }
    }),
    new webpack.EnvironmentPlugin(['AUTH0_CLIENT_ID', 'AUTH0_DOMAIN']),
    new HtmlWebpackPlugin({template: 'index.html'}),
  ],
  target: 'web',
};