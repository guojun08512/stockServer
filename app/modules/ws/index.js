
import WebSocket from 'ws';

function wsbroadcast(wss) {
  // Broadcast to all.
  wss.broadcast = function broadcast(data) { // eslint-disable-line
    wss.clients.forEach(function each(client) { // eslint-disable-line
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };
  return wss;
}

function heatBeat(wss) {
  wss.on('connection', function connection(ws) { // eslint-disable-line
    ws.on('message', function incoming(data) { // eslint-disable-line
      console.log('received: %s', data); // eslint-disable-line
      wss.clients.forEach(function each(client) { // eslint-disable-line
        if (ws === client && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });
  });
}

export function CreateWsServer(port) {
  let wss = new WebSocket.Server({ port });
  heatBeat(wss);
  wss = wsbroadcast(wss);
  return wss;
}
