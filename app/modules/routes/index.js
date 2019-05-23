
import Router from 'koa-router';
import config from 'modules/config';
import apiV1 from './v1';

const router = Router();

router.use('/v1', apiV1.routes(), apiV1.allowedMethods());

router.get('/version', async (ctx) => {
  ctx.success({}, `server version: ${config.get('VERSION')}`);
});

module.exports = router;
