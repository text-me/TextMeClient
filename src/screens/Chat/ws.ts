import config from '../../config.json'

const conn = new WebSocket(config.serverWsUrl);
conn.onclose = function (evt) {
  console.log('WS connection closed')
};

export {conn};
