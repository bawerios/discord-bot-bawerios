const { MessageEmbed } = require('discord.js')

async function coluna(msg, player) {  
  const erroEnterVoiceChat = new MessageEmbed()
    .setColor("#FF0000")
    .setTitle(`:x:  ${msg.author.tag.split("#")[0]} não foi possível entrar no chat de voz.`)


  // Validar se o usuário que pediu a música está em algum canal de voz.
  if (!msg.member.voice.channelId) return msg.reply({ embeds: [NotOnVoiceChannel] })

  const queue = player.createQueue(msg.guild, {
    metadata: {
      channel: msg.channel,
    }
  })

  try {
    if (!queue.connection) {
      await queue.connect(msg.member.voice.channelId)
    }
  } catch (error) {
    queue.destroy();
    return await msg.reply({embeds: [erroEnterVoiceChat]})
  }

  // Busca a música no youtube e retorna uma lista de músicas.
  const youtubeResponse = await player.search('https://youtu.be/x0JAJuAuBlw', {
    requestedBy: msg.author
  })

  queue.addTrack(youtubeResponse.tracks[0])
  if (!queue.playing) {
    await queue.play()
  }
}

module.exports = { coluna }