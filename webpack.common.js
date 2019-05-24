const path = require('path');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/main.js'),

  output: {
    path: path.join(__dirname, "dist")
  },

  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      "TweenLite": path.resolve('node_modules', 'gsap/src/minified/TweenLite.min.js'),
      "TweenMax": path.resolve('node_modules', 'gsap/src/minified/TweenMax.min.js'),
      "TimelineLite": path.resolve('node_modules', 'gsap/src/minified/TimelineLite.min.js'),
      "TimelineMax": path.resolve('node_modules', 'gsap/src/minified/TimelineMax.min.js'),
      "ScrollMagic": path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/ScrollMagic.min.js'),
      "animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js'),
      "debug.addIndicators": path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js')
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css'
    }),
    new CopyPlugin([{
      from: 'src/assets',
      to: './assets'
    }, ]),
    new WebpackMd5Hash()
  ]
};