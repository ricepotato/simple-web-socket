const express = require("express");
const { WebSocketServer } = require("ws");

const app = express();

app.use(express.static("public"));

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

const wss = new WebSocketServer({ port: 8001 });

wss.on("connection", (ws, request) => {
  ws.on("message", (data) => {
    console.log(`received data: ${data}`);
    ws.send("Hello! I received your message.");
  });

  ws.clients.forEach((client) => {
    client.send(`New client connected: ${request.socket.remoteAddress}`);
  });

  ws.send(`Hello ${request.socket.remoteAddress}`);
});
