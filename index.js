(async () => {

    const Discord = require("discord.js");
    const config = require("./config");

    const client = new Discord.Client({
        partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
        fetchAllUsers: true
    });

    client.login(config.token);

    client.commands = new Discord.Collection();
    client.cooldowns = new Discord.Collection();
    client.wait = require("util").promisify(setTimeout);

    client.databaseCache = {
        guilds: new Discord.Collection(),
        users: new Discord.Collection()
    }

    client.db = {};
    client.config = config;

    global.client = client;
    global.chalk = require("chalk");

    // Database
    await require("./database/pool");
    await require("./database/get");

    //Bot
    await require("./bot");
})()
