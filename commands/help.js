module.exports = {
    name: 'help',
    category: 'utils',
    aliases: ["h", "commands"],
    async execute(message, args, data) {
        return message.channel.send({embed: {
          author: { name: message.author.tag, icon_url: message.author.displayAvatarURL() },
          fields: [
            { name: `Utils - (${client.commands.filter(r => r.category === "utils").size})`, value: client.commands.filter(r => r.category === "utils").map(v => `\`${v.name}\``).join(", ") },
            { name: `Economy - (${client.commands.filter(r => r.category === "economy").size})`, value: client.commands.filter(r => r.category === "economy").map(v => `\`${v.name}\``).join(", ") },
            { name: `Administration - (${client.commands.filter(r => r.category === "administration").size})`, value: client.commands.filter(r => r.category === "administration").map(v => `\`${v.name}\``).join(", ") },
            { name: `Owner - (${client.commands.filter(r => r.category === "owner").size})`, value: client.commands.filter(r => r.category === "owner").map(v => `\`${v.name}\``).join(", ") }

          ],
          color: "BLUE",
          timestamp: new Date()
        }})
  },
}
