
import config from 'modules/config';
import app from 'server';
import cluster from 'cluster';
import logger from 'modules/logger';
import { CreateWsServer } from 'modules/ws';
// import { ensureDBConnection } from 'modules/model/db';

const createWorker = () => {
  if (cluster.isMaster) {
    const httpWokerCount = config.get('HTTP_COUNT');
    for (let i = 0; i < httpWokerCount; i += 1) {
      const httpWoker = cluster.fork();
      httpWoker.env = 'http';
      httpWoker.send({ msgtype: 'http' });
    }
    const wsWokerCount = config.get('WS_COUNT');
    for (let i = 0; i < wsWokerCount; i += 1) {
      const wsWoker = cluster.fork();
      wsWoker.env = 'ws';
      wsWoker.send({ msgtype: 'ws' });
    }

    cluster.on('exit', (worker, code, signal) => {
      logger.error(`${worker.env}: ${worker.process.pid} died, signal: ${signal}|| code: ${code}`);
      if (worker.env === 'http') {
        const httpWoker = cluster.fork();
        httpWoker.env = 'http';
        httpWoker.send({ msgtype: 'http' });
      } else if (worker.env === 'ws') {
        const wsWoker = cluster.fork();
        wsWoker.env = 'ws';
        wsWoker.send({ msgtype: 'ws' });
      }
    });
  } else {
    process.on('message', (msg) => {
      if (msg && msg.msgtype === 'http') {
        app.listen(config.get('HTTP_PORT'));
        logger.debug(`http worker (${cluster.worker.id}) Listening on ${config.get('HTTP_PORT')}`);
      } else if (msg && msg.msgtype === 'ws') {
        CreateWsServer();
        logger.debug(`ws worker (${cluster.worker.id}) Listening on ${config.get('WS_PORT')}`);
      }
    });
  }
};

createWorker();
