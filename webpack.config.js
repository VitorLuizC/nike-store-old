const path = require('path');
const { optimize } = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const babelLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: ['babel-loader']
};

const stylusLoader = {
  test: /\.styl$/,
  use: ExtractTextPlugin.extract({
    use: ['css-loader', 'stylus-loader']
  })
};

const pugLoader = {
  test: /\.pug$/,
  use: {
    loader: 'pug-loader',
    query: {
      pretty: true
    }
  }
};

const imageLoader = {
  test: /\.(gif|png|jpe?g|svg)$/,
  use: [
    {
      loader: 'file-loader',
      query: {
        name: 'img/[name].[ext]'
      }
    },
    'image-webpack-loader'
  ]
};

const fontLoader = {
  test: /\.(woff|woff2)$/,
  use: [
    {
      loader: 'file-loader',
      query: {
        name: 'font/[name].[ext]'
      }
    }
  ]
};

const config =  {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].js',
    path: './dist'
  },
  module: {
    rules: [
      stylusLoader,
      babelLoader,
      pugLoader,
      imageLoader,
      fontLoader
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/style.css'),
    new HtmlPlugin({
      filename: 'index.html',
      template: 'src/view/index.pug'
    })
  ],
  devtool: 'inline-source-map',
  target: "web"
};

module.exports = function (env) {
  if (env === 'production') {
    config.plugins.push(new optimize.UglifyJsPlugin());
    config.devtool = false;
    pugLoader.use.query.pretty = false;
  }

  return config;
};
