// Servidor de Express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");

const Sockets = require("./sockets");
const { dbConnection } = require("../database/config");
const { LOG_COLOR } = require("../logcolors/colors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;

    // Connect DDBB
    dbConnection();

    // Http server
    this.server = http.createServer(this.app);

    // Socket configuration
    this.io = socketio(this.server, {
      /* configuraciones */
      // cors: {
      //   origin: "http://localhost:8080",
      // },
    });

    this.sockets = new Sockets(this.io);
  }

  middlewares() {
    // Desplegar el directorio público
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    // CORS
    this.app.use(cors());

    this.app.use(express.json());

    // API ENDPOINTS
    this.app.use("/api/login", require("../router/auth"));
    this.app.use("/api/messages", require("../router/messages"));
  }


  execute() {
    // Init Middlewares
    this.middlewares();
    
    // Init Server
    this.server.listen(this.port, () => {
      console.log(
        `${LOG_COLOR.WHITE}[Server running] >> PORT: ${LOG_COLOR.GREEN}`,
        this.port
      );
    });
  }
}

module.exports = Server;
