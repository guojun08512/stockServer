import Router from 'koa-router';

async function StockData(ctx) {
  const data = ctx.request.body;
  console.log(data);
  ctx.success({ status: 0 }, 'StockData success!');
}

const router = Router();
const routers = router
  .post('/', StockData);

module.exports = routers;
