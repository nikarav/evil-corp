import express from 'express';
import webpack from 'webpack';
import { isDebug } from '../config/app';
import { connect } from './db';
import initPassport from './init/passport';
import initExpress from './init/express';
import initRoutes from './init/routes';
import http from 'http';
import fs from 'fs';
import https from 'https';

var privateKey  = fs.readFileSync('server/sslcert/mykey.key', 'utf8');
var certificate = fs.readFileSync('server/sslcert/mykey.crt', 'utf8');
//'server/sslcert/...'
var credentials = {key: privateKey, cert: certificate};

import renderMiddleware from './render/middleware';

const app = express();

/*
 * Database-specific setup
 * - connect to MongoDB using mongoose
 * - register mongoose Schema
 */
connect();

initPassport();

if (isDebug) {
  // enable webpack hot module replacement
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack/webpack.config');
  const devBrowserConfig = webpackConfig({ browser: true });
  const compiler = webpack(devBrowserConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: devBrowserConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

/*
 * Bootstrap application settings
 */
initExpress(app);

/*
 * REMOVE if you do not need any routes
 *
 * Note: Some of these routes have passport and database model dependencies
 */
initRoutes(app);

/*
 * This is where the magic happens. We take the locals data we have already
 * fetched and seed our stores with data.
 * renderMiddleware matches the URL with react-router and renders the app into
 * HTML
 */
app.get('*', renderMiddleware);

//app.listen(app.get('port'));
var httpServer=http.createServer(app);
httpServer.listen(app.get('port'));
console.log(credentials);
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(8443);
