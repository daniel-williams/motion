const helpers = require('./helpers');
const webpack = require('webpack');

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

const extractedVendorStyles = new ExtractTextPlugin({
  filename: 'assets/bundles/vendorStyles.[contenthash].css'
});

module.exports = function (options) {
  let ENV = JSON.stringify(options.env);

  return {
    entry: {
      'app': './src/app',
      'polyfills': './src/polyfills.tsx',
      'vendor': './src/vendor.tsx',
      'vendorStyles': [
        './client/assets/styles/font-awesome.css',
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
      alias: {
        styles: helpers.root('client', 'assets', 'styles'),
      }
    },
    module: {
      loaders: [
        {
          // vendor styles
          test: /\.css$/,
          include: [helpers.root('client', 'assets', 'styles')],
          use: extractedVendorStyles.extract({
            fallback: 'style-loader',
            use: [
              'to-string-loader',
              'css-loader',
            ],
          }),
        },
        // vendor fonts
        {
          test: /\.(otf|ttf|eot|woff2?|ico|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/bundles/[name].[hash].[ext]',
                publicPath: '/',
              }
            },
          ]
        },
      ]
    },
    plugins: [
      new DefinePlugin({
        'ENV': ENV,
        'process.env.ENV': ENV,
        'process.env.NODE_ENV': ENV,
      }),
      new CommonsChunkPlugin({
        names: ['app', 'vendor', 'polyfills'],
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: 'body',
        favicon: 'client/assets/images/favicon.png',
        showErrors: true
      }),
      extractedVendorStyles,
    ],
  };
};
