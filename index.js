require('dotenv').config();
const { Client, Intents } = require('discord.js')
const { Player } = require('discord-player')

const { token, prefix } = process.env

const { healthCheck } = require('./src/commands/check.js')
const { defaultResponse } = require('./src/commands/defaultResponse.js')
const { play } = require('./src/commands/music/playMusic.js')
const { skip } = require('./src/commands/music/skipMusic.js')
const { help } = require('./src/commands/help/help.js')
const { sort } = require('./src/commands/sort/sort.js')
const { clearQueue } = require('./src/commands/music/clearQueue.js')
const { queue } = require('./src/commands/music/queueMusic.js')
const { coluna } = require('./src/commands/help/coluna.js')

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INTEGRATIONS
  ]
})

const player = new Player(client, {
  leaveOnEnd: true,
  leaveOnStop: true,
  leaveOnEmpty: true,
  leaveOnEmptyCooldown: 5000,
  autoSelfDeaf: true,
  initialVolume: 50,
  bufferingTimeout: 3000,
})

client.login(token)

client.on("ready", () => {
  console.log(`[ON] BOT: ${client.user.tag}`),
  client.user.setActivity(";help")
})

client.on("messageCreate", (msg) => {
  if (msg.author.tag == client.user.tag) return
  const commandFormated = msg.content.toLowerCase()
  if (!commandFormated.startsWith(prefix)) return

  const command = commandFormated.slice(prefix.length).trim().split(/ +/)[0]
  switch (command) {
    case `check`:
      healthCheck(msg, client)
      break
    case `play`:
      const args = msg.content.slice(prefix.length).trim().split(/ +/)
      play(msg, client, player, args)
      break
    case `skip`:
      skip(msg, client, player)
      break
    case `help`:
      help(msg, client)
      break
    case `sort`:
      sort(msg, client)
      break
    case `clear`:
      clearQueue(msg, player)
      break
    case `queue`:
      queue(msg, player)
      break
    case `coluna`:
      coluna(msg, player)
      break
    default :
      defaultResponse(msg, client)
  }
})
