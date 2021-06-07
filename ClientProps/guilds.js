const Rest = require("../Websocket/rest");
async function Guilds(client) {
  const guildArray = await Rest.getGuilds();
  guildArray.forEach((element) => {
    client.guilds.cache.set(element.id, element);
  });
  return guildArray;
}
module.exports = {
  Guilds,
};
