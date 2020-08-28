module.exports = {
    name: 'ping',
    category: 'utils',
    async execute(message, args) {
        message.channel.send(`Pong :ping_pong: ! **${client.ws.ping}ms**`)
    },
}
