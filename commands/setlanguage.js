module.exports = {
    name: 'setlanguage',
    category: 'administration',
    userPermission: "ADMINISTRATOR",
    async execute(message, args, data) {
        if (!args.join(" ")) return message.t("SETLANGUAGE_CHOOSE_ONE");

        if (args[0] === "fr" || args[0].includes("french") || args[0].includes("français") || args[0].includes("francais")) {
            if (data.guild.language === "french") return message.t("SETLANGUAGE_SAME");
            data.guild.language = "french";
            await data.guild.save();
            return message.channel.send("Je vais maintenant parler français.")
        } else if (args[0] === "uk" || args[0] === "us" || args[0].includes("english") || args[0].includes("anglais")) {
            if (data.guild.language === "english") return message.t("SETLANGUAGE_SAME");
            data.guild.language = "english";
            await data.guild.save();
            return message.channel.send("I will now talk english.")
        } else return message.t("SETLANGUAGE_CHOOSE_ONE");
    },
}
