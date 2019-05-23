
import WebSocket from 'ws';
import logger from 'modules/logger';
import config from 'modules/config';

function dealMsg(wss) {
  wss.on('connection', (ws, req) => {
    if (req.url === '/data') {
      ws.on('message', (data) => {
        logger.info('data api received: %s', data); // eslint-disable-line
        wss.clients.forEach((client) => {
          if (ws !== client && client.readyState === WebSocket.OPEN) {
            client.send(data);
          } else if (ws === client && client.readyState === WebSocket.OPEN) {
            client.send('receive data I am ok');
          }
        });
      });
    } else if (req.url === '/heartbeat') {
      ws.on('message', (data) => {
        logger.info('heartbeat received: %s', data); // eslint-disable-line
        wss.clients.forEach((client) => {
          if (ws === client && client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });
      });
    }
  });
}

export function CreateWsServer() {
  const wss = new WebSocket.Server({ port: config.get('WS_PORT') });
  dealMsg(wss);
}

export function SendMsg(pyData) {
  const cliWs = new WebSocket('ws://127.0.0.1:8001/data');
  cliWs.on('open', () => {
    cliWs.send(JSON.stringify(pyData));
  });

  cliWs.on('message', (data) => {
    logger.info('ws response data ===>', data);
    cliWs.close();
  });
}
