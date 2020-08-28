module.exports = {
    name: 'setprefix',
    category: 'administration',
    userPermission: "ADMINISTRATOR",
    async execute(message, args, data) {
        if (!args.join(" ")) return message.t("SETPREFIX_NOT_SPECIFIED");
        if (args.join(" ").includes(" ")) return message.t("SETPREFIX_NO_SPACE");
        if (args.join(" ").length > 5) return message.t("SETPREFIX_LIMIT");
        if (args.join(" ").includes("\n")) return message.t("SETPREFIX_SET_PROPER_PREFIX");
        if (data.guild.prefix === args.join(" ")) return message.t("SETPREFIX_NOT_SPECIFIED");

        data.guild.prefix = args.join(" ");
        await data.guild.save();

        return message.t("SETPREFIX_SUCCESS", args.join(" "));
    },
}
