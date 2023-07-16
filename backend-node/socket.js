const express = require("express"); // using express
const socketIO = require("socket.io");
const http = require("http");
const port = process.env.PORT || 3000; // setting the port
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client-side.html");
});

server.listen(port);
