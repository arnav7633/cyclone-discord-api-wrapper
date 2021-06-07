const EventEmitter = require("events");
const socket = require("./Websocket/ws");
const { headers } = require("./constants/payload");
const guilds = require("./ClientProps/guilds");
class Client extends EventEmitter {
  constructor(options) {
    super();
    this.guilds = {};
    this.guilds.cache = new Map();
    headers["Authorization"] = `Bot ${options.token}`;
    console.log("Connecting");
    guilds.Guilds(this).then((array) => {
      console.log(array);
    });
    console.log(this);
    setTimeout(() => {
      console.log(Client), (Client.ws = new socket(Client, options));
    }, 10 * 1000);
  }
}
module.exports = Client;

const c = new Client({
  token: "NzYwNzQxODM3MjQxMDU3Mjkw.X3QeCw.ZBgAWq7EsMUoDIvGNT6IhjMK0VA",
});
c.on("READY", () => {
  console.log("HI");
});
console.log(c.guilds);
