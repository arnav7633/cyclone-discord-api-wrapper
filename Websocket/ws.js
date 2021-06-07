const EventEmitter = require("events");
const ws = require("ws");
const { Constants, OPCODE } = require("../constants/constants");
const { Heartbeat } = require("../constants/payload");
const { Identify } = require("../constants/payload");
ack = false;

async function heartbeat(ms, socket) {
  return setInterval(() => {
    socket.send(JSON.stringify(Heartbeat));
  }, ms);
}

async function identify(token, socket) {
  Identify.d.token = token;
  socket.send(JSON.stringify(Identify));
}

class WebSocket {
  constructor(client, options) {
    this.client = client;
    const that = this;
    async function connect() {
      const connection = await new ws(Constants.GATEWAY);
      connection.on("message", async function incoming(data) {
        try {
          const payload = JSON.parse(data.toString());
          const { t, op } = payload;
          if (t) {
            setTimeout(() => that.client.emit(t, payload), 0);
          }
          switch (op) {
            case OPCODE.TEN:
              const { heartbeat_interval } = payload;
              this.interval = await heartbeat(heartbeat_interval, connection);
              await identify(options.token, connection);
              break;
            case OPCODE.ELEVEN:
              ack = true;
          }
        } catch (err) {
          console.log(err);
          return err;
        }
      });
    }
    connect();
  }
}
module.exports = WebSocket;
