module.exports = {
    name: 'eval',
    category: 'owner',
    async execute(message, args, data) {
        const util = require('util')


        try { // This eval command is from https://github.com/TheSharks/WildBeast/ because I really like their method
            const returned = eval(args.join(" "))
            let str = util.inspect(returned, {
                depth: 1
            })
            if (str.length > 1900) {
                str = `${str.substr(0, 1897)}...`
            }
            str = str
                .replace(new RegExp(client.config.token, 'gi'), 'S3CR3T')
                .replace(new RegExp(client.config.pg_pass, 'gi'), 'S3CR3T')

            message.channel.send('```js\n' + str + '\n```').then(ms => {
                if (returned !== undefined && returned !== null && typeof returned.then === 'function') {
                    returned.then(() => {
                        str = util.inspect(returned, {
                            depth: 1
                        })
                        if (str.length > 1900) {
                            str = str.substr(0, 1897)
                            str = str + '...'
                        }
                        ms.edit('```js\n' + str + '\n```')
                    }, e => {
                        str = util.inspect(e, {
                            depth: 1
                        })
                        if (str.length > 1900) {
                            str = str.substr(0, 1897)
                            str = str + '...'
                        }
                        ms.edit('```js\n' + str + '\n```')
                    })
                }
            }).catch(() => {})
        } catch (e) {
            message.channel.send('```js\n' + e + '\n```').catch(() => {})
        }
    },
}
