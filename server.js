const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const { Receiver } = require('sacn');

const PORT = process.env.PORT || 3000;
const SACN_UNIVERSE = 1;

// Express setup
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
const server = http.createServer(app);

// WebSocket setup
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('WebSocket client connected to server');
    ws.on('close', () => {
        console.log('WebSocket client disconnected from server');
    });
});

// Function to broadcast data to all connected clients
function broadcast(data) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

const sACN = new Receiver({ universes: [SACN_UNIVERSE] });

sACN.on('packet', (packet) => {
    // DMX channels are 1-based, Buffer is 0-based.
    const slots = packet.slotsData;
    const colorData = {
        r: slots[0] || 0, // Channel 1
        g: slots[1] || 0, // Channel 2
        b: slots[2] || 0, // Channel 3
        a: slots[3] || 0, // Channel 4
    };

    // Broadcast the new color data to all WebSocket clients
    broadcast(colorData);
});

sACN.on('error', (err) => { console.error('sACN Error:', err); });

// Start server
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is listening for sACN data in universe ${SACN_UNIVERSE} on port ${PORT} across all network interfaces.`);
    console.log(`Open http://localhost:${PORT} or http://<your-ip-address>:${PORT} in a browser.`);
});
