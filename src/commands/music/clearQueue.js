const { MessageEmbed } = require('discord.js')

async function clearQueue(msg, player) {     
  const queue = player.getQueue(msg.guild.id)

  if (!queue) {
    const queueEmpty = new MessageEmbed()
    .setColor("#FF0000")
    .setTitle(`:x: A fila de música está vazia!`)

    msg.reply({ embeds: [queueEmpty] });
    return
  } else {
    queue.clear()
    const queueEmptySucess = new MessageEmbed()
    .setColor("#FF0000")
    .setTitle(`:white_check_mark: A fila de música foi limpa!`)

    msg.reply({ embeds: [queueEmptySucess] });
    return
  }
}

module.exports = { clearQueue }