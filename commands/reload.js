const fs = require("fs")

module.exports = {
    name: 'reload',
    category: 'owner',
    async execute(message, args) {

        if (args[0] === "--all") {
            let cmdn = client.commands.size;
            const msg = await message.channel.send("Reloading...");
            const core = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

            for (const file of core) {
                await delete require.cache[require.resolve(`../commands/${file}`)];
                const command = require(`../commands/${file}`);
                command.path = `./commands/${file}`;
                client.commands.set(command.name.toLowerCase(), command);
            }

            msg.edit(message.language.get("RELOAD_COMMAND_SUCCESS_ALL", cmdn));
            return;
        }

        if(args[0] === "--l" || args[0] === "--language"){
          const msg = await message.channel.send("Reloading...");

          const core = fs.readdirSync('./languages/').filter(file => file.endsWith('.js'));

          for (const file of core) {
            await delete require.cache[require.resolve(`../languages/${file}`)];
          }

          msg.edit(message.language.get("RELOAD_LANGUAGE_SUCCESS"))
          return;
        }


        let commandName = args[0];
        let cmd = client.commands.get(commandName) || client.commands.find(cmdd => cmdd.aliases && cmdd.aliases.includes(commandName));
        if (!cmd) return message.t("RELOAD_ERROR_COMMAND_NOT_FOUND");

        await delete require.cache[require.resolve(`.${cmd.path}`)];
        let cmd_path = require(`.${cmd.path}`);

        cmd_path.client = client;
        cmd_path.path = cmd.path;

        client.commands.set(cmd.name.toLowerCase(), cmd_path);
        return message.t("RELOAD_SUCCESS_COMMAND", cmd.name);
    },
}
