import Router from 'koa-router';
import { SendMsg } from 'modules/ws';
import * as SelfMap from 'modules/services';

async function StockData(ctx) {
  const data = ctx.request.body;
  if (data && data.id) {
    SelfMap.AddValue(data.id, data);
    SendMsg(data);
  }
  ctx.success({ status: 0 }, 'StockData success!');
}

async function GetAllData(ctx) {
  ctx.success({ data: SelfMap.GetAll() }, 'GetAllData success!');
}

const router = Router();
const routers = router
  .post('/', StockData)
  .get('/alldata', GetAllData);

module.exports = routers;
