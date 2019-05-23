
import Router from 'koa-router';
import StockApi from './stockapi';

const router = Router();
router.use('/stock', StockApi.routes(), StockApi.allowedMethods());

export default router;
