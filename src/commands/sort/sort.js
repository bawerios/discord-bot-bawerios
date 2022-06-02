const { MessageEmbed } = require('discord.js')

async function sort(msg) {     
  const msgContent = msg.content.split(';sort')

  const msgSplitedByCommon = msgContent[1].split(',')
  const divider = msgSplitedByCommon.shift()
  if (divider == ' 1') {
    const result = msgSplitedByCommon[Math.floor(Math.random() * msgSplitedByCommon.length)]

    const response = new MessageEmbed()
      .setColor("#00FF00")
      .setTitle(`:loudspeaker: SORTEIO!`)
      .setDescription(`O sorteado é ${result}`)

    msg.reply({ embeds: [response] });
    return
  } else {
    
  }
}

module.exports = { sort }