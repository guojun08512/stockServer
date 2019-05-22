
import nconf from 'nconf';
import path from 'path';

nconf.argv();
nconf.env();
nconf.defaults({
  NODE_ENV: 'development',
  HTTP_PORT: 8000,
  WS_PORT: 8001,
  HTTP_COUNT: 1,
  WS_COUNT: 1,
  VERSION: 'V0.1.0',

  HOST_URL: 'http://127.0.0.1:8000',
  SERVER_IP: '127.0.0.1',

  LOG_DIR: path.join(process.cwd(), '..', 'logs'),
  PUBLIC_KEY: 'stock2019',
});

export default {
  get: key => nconf.get(key),
  getBoolean: (key) => {
    let val = nconf.get(key);
    if (typeof val === 'string') {
      val = val.toLowerCase();
      return val === 'true' || val === 'yes';
    }
    return Boolean(val);
  },
  getNumber: key => Number(nconf.get(key)),
};
