import Router from 'koa-router';
import { SendMsg } from 'modules/ws';
import * as SelfMap from 'modules/services';

const names = [
  '上证指数',
  '深证成指',
  '浦发银行',
  '中国核建',
  '航天信息',
  '特锐德',
  '万科A',
  '国农科技',
  'PTA主力',
  '铁矿主力',
  '橡胶主力',
  '沥青主力',
  '螺纹主力',
  '原油主力',
  '沪金主力',
  '伦敦金',
  'EUR/USD',
  'GBP/USD',
  'USD/JPY',
  'USD/AUD',
  'USD/CAD',
  'USD/CHF',
  'NZD/USD',
  '离岸CNH',
  '比特币',
  '恒生指数',
  '道指工业',
  '纳斯达克',
  '富时100',
  '日经225',
];

async function StockData(ctx) {
  const data = ctx.request.body;
  if (data && data.id) {
    SelfMap.AddValue(data.id, data);
    const mapData = SelfMap.GetAll();
    const keys = Object.keys(mapData);
    const msg = keys.map(k => ({
      name: names[k - 1],
      ...mapData[k],
    }));
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
