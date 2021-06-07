const { OPCODE } = require("./constants");
module.exports.headers = {
  "Content-Type": "application/json",
  Authorization: "",
};
module.exports.Heartbeat = {
  op: OPCODE.ONE,
  d: null,
};
module.exports.Identify = {
  op: OPCODE.TWO,
  d: {
    token: "",
    properties: {
      $os: "linux",
      $browser: "machete",
      $device: "machete",
    },
  },
};
