// Servidor de señalización WebSocket para WebRTC
// Reenvía mensajes entre los clientes conectados

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

let clients = [];

wss.on('connection', function connection(ws) {
    clients.push(ws);

    ws.on('message', function incoming(message) {
        // Reenviar el mensaje a todos los clientes excepto el que lo envió
        clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        clients = clients.filter(client => client !== ws);
    });
});

console.log('Servidor de señalización WebSocket iniciado en ws://localhost:3000');