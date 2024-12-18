const { checkJWT } = require("../helpers/jwt");
const {
  userConnected,
  userDisconnected,
  getUsers,
  saveMessage,
} = require("../controllers/sockets");

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", async (socket) => {
      const token = socket.handshake.query["x-token"];
      const [valid, uid] = checkJWT(token);

      if (!valid) {
        console.log("socket not identify!");
        return socket.disconnect();
      }

      await userConnected(uid);

      socket.join(uid);

      this.io.emit("list-users", await getUsers());

      socket.on("message-personal", async (payload) => {
        const message = await saveMessage(payload);
        const { from, to } = payload;
        this.io.to(to).emit("message-personal", message);
        this.io.to(from).emit("message-personal", message);
      });

      socket.on("disconnect", async () => {
        await userDisconnected(uid);
        this.io.emit("list-users", await getUsers());
      });
    });
  }
}

module.exports = Sockets;
