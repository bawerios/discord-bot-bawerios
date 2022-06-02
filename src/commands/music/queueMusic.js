const { MessageEmbed } = require('discord.js')

async function queue(msg, player) {     
  const queue = player.getQueue(msg.guild.id)

  if (!queue) {
    const queueEmpty = new MessageEmbed()
    .setColor("#FF0000")
    .setTitle(`:x: A fila de música está vazia!`)

    msg.reply({ embeds: [queueEmpty] });
    return
  }

  const tracks = []

  for (const track of queue.tracks) {
    tracks.push({name: `${track.title}`, value: '\u200B'})
  }

  const queueNow = new MessageEmbed()
      .setColor("#00FF00")
      .setTitle(`:bookmark_tabs: Fila de músicas!`)
      .setDescription(`:arrow_forward: ${queue.previousTracks[0].title}`)
      .addFields(tracks)

  msg.reply({ embeds: [queueNow] });
  return
}

module.exports = { queue }