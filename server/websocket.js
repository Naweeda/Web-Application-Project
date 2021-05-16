const WebSocket = require('ws');
const redis = require('redis');
const client = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });

const wss = new WebSocket.Server({ port: 4004 });

const users = {};

wss.on('connection', (ws) => {
  console.log('Someone has connected');

  ws.on('message', (data) => { // gets data from api that is published
    console.log('HERE');
    console.log('Received data: ' + data);
    const receivedData = JSON.parse(data); // parse json data
    users[receivedData.channelId] = ws; // saves websocket instance to userId in users object
    users[receivedData.channelId].send(data);
  });

  console.log(users);
});

client.on('message', (channel, message) => {
  console.log(`subscriber hears message ${message} on channel ${channel}`);
  const receivedText = message; // parse json data
  wss.clients.forEach((client) => {
    client.send(message);
  });
});

client.subscribe('testPublish');
console.log('Server online');