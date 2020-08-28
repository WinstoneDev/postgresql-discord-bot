const fs = require("fs");

client.on("ready", async () => {
    await require("./utils/cacheUsers");
    await require("./utils/cacheGuilds");
    await client.wait(1000);
    await console.log(chalk.yellow("----------------------------------------------------------------"))
    await console.log(chalk.blue("[BOT]") + ` successfully logged to the bot`)
    await init();
})

async function init() {
    const core = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

    for (const file of core) {
        const command = require(`./commands/${file}`);
        command.path = `./commands/${file}`;
        client.commands.set(command.name.toLowerCase(), command);
        await console.log(chalk.blue("[BOT]") + ` ${file} loaded`);
    }
    await console.log(chalk.yellow("----------------------------------------------------------------"));


    await fs.readdir("./events/", async (_err, files) => {
        await files.forEach(async (file) => {
            if (!file.endsWith(".js")) return;
            const event = require(`./events/${file}`);
            let eventName = file.split(".")[0];
            await console.log(chalk.blue("[BOT]") + ` event ${eventName} loaded`);
            client.on(eventName, event.bind(null));
            delete require.cache[require.resolve(`./events/${file}`)];
        });
        await console.log(chalk.yellow("----------------------------------------------------------------"));
        await console.log(chalk.blue("[BOT]") + ` the bot is now ready`);

    });
}
