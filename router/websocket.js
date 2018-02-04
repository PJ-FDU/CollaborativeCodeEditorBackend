import Router from 'koa-router';
import { share } from '../db';
import WebSocketJSONStream from 'websocket-json-stream';

const router = new Router();

router.get('/ws', async (ctx) => {
  console.log("connection success", ctx.query);

  // Do other websocket stuff here
});

export default router;
