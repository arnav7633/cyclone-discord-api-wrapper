const axios = require("axios");
const fetch = require("node-fetch");
const { Constants, ENDPOINTS } = require("../constants/constants");
const { headers } = require("../constants/payload");
async function makeReq(type, url, headers) {
  const res = await axios({
    method: type,
  });
}
async function getGuilds() {
  const res = await fetch(`${Constants.API}/${ENDPOINTS.USER_GUILDS}`, {
    method: "GET",
    headers: headers,
  });
  return await res.json();
}
module.exports = {
  getGuilds,
};
