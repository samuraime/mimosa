const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const staticServe = require('koa-static');
const mongoose = require('mongoose');
const config = require('./config');
const router = require('./router');

mongoose.Promise = global.Promise;

const app = new Koa();

app.use(staticServe(config.staticPath));
app.use(bodyParser());
app.use(router.routes());

function listen () {
  app.listen(config.port);
  console.log(`Listening on port ${config.port}`);
}

function connect () {
  const options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(config.db, options).connection;
}

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);
