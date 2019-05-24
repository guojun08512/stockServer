import Router from 'koa-router';
import { SendMsg } from 'modules/ws';
import * as SelfMap from 'modules/services';

async function StockData(ctx) {
  const data = ctx.request.body;
  if (data && data.id) {
    SelfMap.AddValue(data.id, data);
    SendMsg(SelfMap.GetAll());
  }
  ctx.success({ status: 0 }, 'StockData success!');
}

const router = Router();
const routers = router
  .post('/', StockData);

module.exports = routers;
