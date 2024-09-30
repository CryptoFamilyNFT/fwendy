import Webpack from 'webpack';
import path from 'path';
import crypto from 'crypto-browserify';
import stream from 'stream-browserify';
import assert from 'assert';
import http from 'stream-http';
import https from 'https-browserify';
import os from 'os-browserify';
import url from 'url';
import zlib from 'browserify-zlib';
import vm from 'vm-browserify';

const config = {
  resolve: {
    fallback: {
      crypto: crypto,
      stream: stream,
      assert: assert,
      http: http,
      https: https,
      os: os,
      url: url,
      zlib: zlib,
      vm: vm
    },
  },
  plugins: [
    new Webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false, // disable the behavior
        },
      },
    ],
  },
};

export default config;
