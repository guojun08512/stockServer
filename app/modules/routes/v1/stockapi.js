import Router from 'koa-router';
import { SendMsg } from 'modules/ws';
import * as SelfMap from 'modules/services';

async function StockData(ctx) {
  const data = ctx.request.body;
  if (data && data.id) {
    SelfMap.AddValue(data.id, data);
    const mapData = SelfMap.GetAll();
    const keys = Object.keys(mapData);
    const msg = keys.map(k => mapData[k]);
    SendMsg(msg);
  }
  ctx.success({ status: 0 }, 'StockData success!');
}

async function GetAllData(ctx) {
  const mapData = SelfMap.GetAll();
  const keys = Object.keys(mapData);
  const data = keys.map(k => mapData[k]);
  ctx.success({ data }, 'GetAllData success!');
}

const router = Router();
const routers = router
  .post('/', StockData)
  .get('/alldata', GetAllData);

module.exports = routers;
