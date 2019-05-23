import Router from 'koa-router';
import { SendMsg } from 'modules/ws';

async function StockData(ctx) {
  const data = ctx.request.body;
  SendMsg(data);
  ctx.success({ status: 0 }, 'StockData success!');
}

const router = Router();
const routers = router
  .post('/', StockData);

module.exports = routers;
