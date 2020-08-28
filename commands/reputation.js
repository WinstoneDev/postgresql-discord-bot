module.exports = {
    name: 'reputation',
    aliases: ["rep"],
    category: 'economy',
    async execute(message, args, data) {

      if(data.user.cooldowns.reputation >= Date.now()) return message.t("REPUTATION_COOLDOWN", data.user);

      let target = message.mentions.users.map(v=>v)[0];
      if(!target) return message.t("PLEASE_MENTION_USER");

      if(target.id === message.author.id) return message.t("REPUTATION_NICE_TRY");
      if(target.bot) return message.t("TARGET_BOT");

      let userData = await client.db.getOrCreateUser(target);

      data.user.cooldowns.reputation = Date.now()+86399999;
      userData.economy.reputation++;

      await data.user.save();
      await userData.save();

      return message.t("REPUTATION_SUCCESS", target);

  },
}
