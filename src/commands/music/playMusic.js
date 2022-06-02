const { MessageEmbed } = require('discord.js')

async function play(msg, client, player, args) {  
  args.shift()
  let search_music = args.join(" ");

  const NotOnVoiceChannel = new MessageEmbed()
    .setColor("#FF0000")
    .setTitle(`:x:  ${msg.author.tag.split("#")[0]} você precisa entrar em um chat de voz.`)
  
  const emptySearch = new MessageEmbed()
    .setColor("#FF0000")
    .setTitle(`:x:  ${msg.author.tag.split("#")[0]} digite o nome/link da música no youtube.`)
    .setDescription(`Exemplo: $tocar o meu lugar madureira`)
  
  const erroEnterVoiceChat = new MessageEmbed()
    .setColor("#FF0000")
    .setTitle(`:x:  ${msg.author.tag.split("#")[0]} não foi possível entrar no chat de voz.`)

  const warningSearchMusic = new MessageEmbed()
    .setColor("#FFFF00")
    .setTitle(`:hourglass:  Buscando...`)
    .setDescription(search_music)

  const notFoundMusic = new MessageEmbed()
    .setColor("#FF0000")
    .setTitle(`:x:  Música não encontrada.`)

  const unknownOption = new MessageEmbed()
    .setColor("#FF0000")
    .setTitle(`:x:  Opção não reconhecida.`)

  const cancelOption = new MessageEmbed()
    .setColor("#FF0000")
    .setTitle(`:x:  Comando de tocar música interrompido.`)


  // Validar se o usuário que pediu a música está em algum canal de voz.
  if (!msg.member.voice.channelId) return msg.reply({ embeds: [NotOnVoiceChannel] })

  //Validar se o usuário digitou o nome/link de alguma música.
  if (!search_music) return msg.reply({ embeds: [emptySearch]})

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
    console.log(error.message)
    queue.destroy();
    return await msg.reply({embeds: [erroEnterVoiceChat]})
  }

  const warningSearchMusicMsg = await msg.reply({ embeds: [warningSearchMusic] });

  // Busca a música no youtube e retorna uma lista de músicas.
  const youtubeResponse = await player.search("music" + search_music, {
    requestedBy: msg.author
  })

  // Valida se não encontrar nem uma música.
  if (youtubeResponse.tracks.length == 0) {
    warningSearchMusicMsg.delete()
    return msg.reply({ embeds: [notFoundMusic] });
  }

  youtubeResponse.tracks.splice(5, 15)

  // Envia uma mensagem com as opções de música
  const tracks = []
  for (const [index, track] of youtubeResponse.tracks.entries()) {
    tracks.push({ name: `${index + 1} : ${track.title}  (${track.duration})`, value: "\u200B" })
  }
  warningSearchMusicMsg.delete()
  const whatSong = new MessageEmbed()
    .setColor("#FFFF00")
    .setDescription(`Digite o número que aparece no começo da musica para selecionar a música.`)
    .setTitle(`:mag: Escolha uma música`)
    .addFields({ name: `\u200B`, value: "\u200B" })
    .addFields(tracks)
    .addFields({ name: `C : Cancelar`, value: "\u200B" })
  const optionTracks = await msg.reply({ embeds: [whatSong] });

  // Pega respost do usuário escolheu.
  const filter = (m) => m.author.id === msg.author.id
  const collected = await msg.channel.awaitMessages({ filter, max: 1 })


  // Valida se a resposta do usuário é valida.
  if (collected.first().content.toLowerCase() !== "c" 
      && collected.first().content !== "1"
      && collected.first().content !== "2"
      && collected.first().content !== "3"
      && collected.first().content !== "4"
      && collected.first().content !== "5"
  ) {
    optionTracks.delete()
    return msg.reply({ embeds: [unknownOption] });
  }

  // Se o usuário cancelar o comando.
  if (collected.first().content.toLowerCase() == 'c') {
    optionTracks.delete()
    return msg.reply({ embeds: [cancelOption] });
  }

  optionTracks.delete()

  // Adiciona a música na fila
  const addToQueue = new MessageEmbed()
    .setColor("#00FF00")
    .setTitle(`:white_check_mark:  Música adicionada a fila.`)
    .setDescription(`${youtubeResponse.tracks[collected.first().content - 1].title}`)
  if (youtubeResponse.playlist) {
    queue.addTracks(youtubeResponse.tracks[collected.first().content - 1])
    msg.reply({ embeds: [addToQueue] });
  } else {
    if (queue.playing) {
      queue.addTrack(youtubeResponse.tracks[collected.first().content - 1])
      msg.reply({ embeds: [addToQueue] });
    } else {
      queue.addTrack(youtubeResponse.tracks[collected.first().content - 1])
      const playNow = new MessageEmbed()
        .setColor("#00FF00")
        .setTitle(`:musical_note:  Música tocando...`)
        .setDescription(`${youtubeResponse.tracks[collected.first().content - 1].title}`)
  
      msg.reply({ embeds: [playNow] });
    }
  }

  // Tocar as músicas que estão na fila
  if (!queue.playing) {
    await queue.play()
  }

}

module.exports = { play }