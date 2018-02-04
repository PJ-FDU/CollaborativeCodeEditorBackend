import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import websockify from 'koa-websocket';
import WebSocketJSONStream from 'websocket-json-stream';
import logger from 'koa-logger';
import json from 'koa-json';
import cors from 'kcors';
import session from 'koa-session';
import convert from 'koa-convert';
import serve from 'koa-static';
// import finalHandler from './lib/middlewares/finalHandler';

import websocketRoutes from './router/websocket';

import * as routes from './router/';

// DB
import share from './db';

const app = websockify(new Koa(), {
  onConnection: (socket) => {
    const stream = new WebSocketJSONStream(socket);
    share.listen(stream);
  },
});

app.use(cors());

app.use(json({ pretty: false, param: 'pretty' }));

// app.use(finalHandler());

app.use(logger());
app.use(bodyParser());
app.keys = ['some secret hurr'];
app.use(convert(session(app)));
app.use(serve(__dirname + '/public'));

// Routes setup
Object.values(routes).forEach((route) => {
  app.use(route.routes())
    .use(route.allowedMethods());
});

app.ws.use(websocketRoutes.routes())
  .use(websocketRoutes.allowedMethods());

export default app;
