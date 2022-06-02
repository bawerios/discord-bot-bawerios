const { MessageEmbed } = require('discord.js')

async function help(msg, client) {     
  const help = new MessageEmbed()
  .setColor("#00FF00")
  .setTitle(`:grey_question: Todos os comandos!`)
  .addFields([
    {name: '\u200B', value: '\u200B'},
    {name: ';play  <Nome da música>  --> Para tocar uma música.', value: '\u200B'},
    {name: ';skip  --> Passa para a próxima música da fila.', value: '\u200B'},
    {name: ';queue --> Mostra a música que está tocando e todas as músicas que estão na fila.', value: '\u200B'},
    {name: ';clear --> Limpa a fila de músicas.', value: '\u200B'},
    {name: ';check  --> Para saber se o bot está ON.', value: '\u200B'},
    {name: ';sort <0-9> <nome1, nome2, nome3, nome4...>  --> Se escolher o número 1 irá sortear somente 1. Se escolher um número maior que 1 ele irá sortear conjuntos iguais.', value: '\u200B'},
    {name: ';help  --> Para ver todos os comando disponiveis.', value: '\u200B'},

  ])

  msg.reply({ embeds: [help] });
  return
}

module.exports = { help }