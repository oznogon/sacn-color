# sACN RGBA color viewer

This web application receives a four-channel sACN (E1.31) signal on universe 1 and displays the corresponding RGBA color on a web page using a Node.js backend.

## Setup

Requires Node.js or equivalent, Express, WebSockets, https://github.com/k-yle/sACN.

1. Install dependencies:

   ```bash
   npm install
   ```
1. Start the server:

   ```bash
   npm start
   ```
1. Open http://localhost:3000 or http://<your-ip-address:3000.
1. Send RGBA values as sACN data on corresponding channels 1-4 in universe 1.

   The web page's color updates in real time. The server should listen on all network interfaces.
