module.exports = {
    name: 'leaderboard',
    category: 'economy',
    aliases: ["lb"],
    async execute(message, args, data) {
      let toLb;
      if(args[0] === "credits" || args[0] === "credit" || args[0] === "money"){
        toLb = "money";
      } else if(args[0] === "rep" || args[0] === "reputation"){
        toLb = "reputation";
      } else return message.t("LEADERBOARD_NOT_SPECIFIED");

      let lb = await client.databaseCache.users.map(v => v).sort((a, b) => b.economy[toLb] - a.economy[toLb]);
      lb.length = client.databaseCache.users.size < 10 ? client.databaseCache.users.size : 10;

      let content = "";

      for(let i = 0; i < lb.length; i++){

        let user = await client.users.fetch(lb[i].id);

        let tC = undefined;
        if(i === 0){
          tC = `:trophy: ${user.tag}`;
        } else if(i === 1){
          tC = `:second_place: ${user.tag}`;
        } else if(i === 2){
          tC = `:third_place: ${user.tag}`;
        }

        content+= `${tC !== undefined ? tC : `${i+1}. ${user.tag}`} - **${lb[i].economy[toLb]}** ${toLb.replace("money", "credits").replace("reputation", lb[i].economy[toLb] <= 1 ? "reputation" : "reputations")}\n\n`

      }

      message.channel.send({embed: {
        title: `${toLb.replace("money", "Credits leaderbard").replace("reputation", "Reputation leaderboard")}`,
        description: content,
        color: "BLUE",
        timestamp: new Date()
      }})

  },
}
