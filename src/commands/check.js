const { MessageEmbed } = require('discord.js')

function healthCheck(msg, client) {
  let author = msg.author.tag.split("#")[0]
  let botName = client.user.tag.split("#")[0]
  const embed = new MessageEmbed()
    .setColor("#00FF00")
    .setDescription(`Olá ${author} estou pronto para ajudar!`)
    .setTitle(`[ON] BOT ${botName}`)
  msg.channel.send({ embeds: [embed] });
}

module.exports = { healthCheck }