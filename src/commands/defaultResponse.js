const { MessageEmbed } = require('discord.js')

function defaultResponse (msg, client) {
  let author = msg.author.tag.split("#")[0]
  const embed = new MessageEmbed()
    .setColor("#FF0000")
    .setDescription(`${author} eu ainda não tenho esse comando!`)
    .setTitle(`❓ Comando não reconhecido!`)
  msg.channel.send({ embeds: [embed] });
}

module.exports = { defaultResponse }