const { MessageEmbed } = require('discord.js')

async function skip(msg, client, player) {     
  const queue = player.getQueue(msg.guild.id)
  if (!queue) {
    const queueEmpty = new MessageEmbed()
    .setColor("#FF0000")
    .setTitle(`:x: A fila de música está vazia!`)

    msg.reply({ embeds: [queueEmpty] });
    return
  }

  await queue.skip()

  if (!queue.tracks.length == 1) {
    const queueEmpty = new MessageEmbed()
    .setColor("#FFFF00")
    .setTitle(`:interrobang: A fila de música ficou vazia!`)

    msg.reply({ embeds: [queueEmpty] });
    return
  }

  const playNow = new MessageEmbed()
    .setColor("#00FF00")
    .setTitle(`:musical_note:  Música tocando...`)
    .setDescription(`${queue.tracks[0].title}`)
  
    msg.reply({ embeds: [playNow] });
  return
}

module.exports = { skip }