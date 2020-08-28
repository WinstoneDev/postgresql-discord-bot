module.exports = {
    name: 'daily',
    category: 'economy',
    async execute(message, args, data) {
      if(data.user.cooldowns.daily >= Date.now()) return message.t("DAILY_COOLDOWN", data.user);

      data.user.cooldowns.daily = Date.now()+86399999;
      data.user.economy.money = data.user.economy.money+100;
      await data.user.save();

      return message.t("DAILY_SUCCESS");
    },
}
