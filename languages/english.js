module.exports = class {

    constructor() {
        this.language = {
            no: "no",
            yes: "yes",

            NO_ENOUGH_PERMS: "You don't have enough permissions.",
            PLEASE_MENTION_USER: "Please mention a user.",
            TARGET_BOT: "This user is a bot.",

            RELOAD_SUCCESS_COMMAND: (cmd) => `Command **${cmd}** has been successfully reloaded.`,
            RELOAD_ERROR_COMMAND_NOT_FOUND: `Can't find this command.`,
            RELOAD_COMMAND_SUCCESS_ALL: (nb) => `${client.commands.size}/${nb} commands has been reloaded.`,
            RELOAD_LANGUAGE_SUCCESS: "Languages files has been reloaded.",

            SETPREFIX_NOT_SPECIFIED: "Please specify a new prefix.",
            SETPREFIX_NO_SPACE: "The new prefix must not contain spaces.",
            SETPREFIX_LIMIT: "Then new prefix must not exceed 5 caracters.",
            SETPREFIX_SET_PROPER_PREFIX: "The new prefix must not contain lines.",
            SETPREFIX_SUCCESS: (p) => `The new prefix is now: \`${p}\``,

            SETLANGUAGE_SAME: "I'm already talking english.",
            SETLANGUAGE_CHOOSE_ONE: "Please choose between **français** and **english**.",

            LEADERBOARD_NOT_SPECIFIED: "Please choose between **reputation** and **money**.",

            DAILY_COOLDOWN: (user) => `You already took your salary recently. Come back in **${this.convertMs(user.cooldowns.daily - Date.now())}**`,
            DAILY_SUCCESS: "**100** credits has been added to your account.",

            REPUTATION_COOLDOWN: (user) => `You already gived a reputation recently. Try again in **${this.convertMs(user.cooldowns.daily - Date.now())}**`,
            REPUTATION_SUCCESS: (target) => `You gave <@${target.id}> 1 reputation.`,
            REPUTATION_NICE_TRY: "You can't give a reputation to yourself."


        }
    }

    /**
     * The method to get language strings
     * @param {string} term The string or function to look up
     * @param {...*} args Any arguments to pass to the lookup
     * @returns {string|Function}
     */

    get(term, ...args) {
        const value = this.language[term];
        switch (typeof value) {
            case "function":
                return value(...args);
            default:
                return value;
        }
    }




    printDate(pdatee, isLongDate) {
        const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
        let pdate = new Date(pdatee)
        let day = pdate.getDate(),
            monthIndex = pdate.getMonth(),
            year = pdate.getFullYear(),
            hour = pdate.getHours() < 10 ? "0" + pdate.getHours() : pdate.getHours(),
            minute = pdate.getMinutes() < 10 ? "0" + pdate.getMinutes() : pdate.getMinutes();

        let thedate = (isLongDate) ? day + " " + monthNames[monthIndex] + " " + year + " à " + hour + "h" + minute :
            day + " " + monthNames[monthIndex] + " " + year
        return thedate;
    }

    getDate(pdatee) {
        const moment_t = require("moment-timezone");
        let pdate = new Date(pdatee)
        let day = pdate.getDate();
        let year = pdate.getFullYear()
        let month = pdate.getMonth() + 1;
        if (month <= 9) month = `0${month}`
        if (day <= 9) day = `0${day}`
        const time = moment_t.tz(pdate, "Europe/Paris").format("HH:mm:ss");
        let pDate = `${day}/${month}/${year} ${time}`;
        return pDate;


    }

    /**
     * Parse ms and returns a string
     * @param {number} milliseconds The amount of milliseconds
     * @returns The parsed milliseconds
     */
    convertMs(milliseconds) {
      let roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;
  		let days = roundTowardsZero(milliseconds / 86400000),
  		hours = roundTowardsZero(milliseconds / 3600000) % 24,
  		minutes = roundTowardsZero(milliseconds / 60000) % 60,
  		seconds = roundTowardsZero(milliseconds / 1000) % 60;
  		if(seconds === 0){
  			seconds++;
  		}
  		let isDays = days > 0,
  		isHours = hours > 0,
  		isMinutes = minutes > 0;
  		let pattern =
  		(!isDays ? "" : (isMinutes || isHours) ? "{days} days, " : "{days} days and ")+
  		(!isHours ? "" : (isMinutes) ? "{hours} hours, " : "{hours} hours and ")+
  		(!isMinutes ? "" : "{minutes} minutes and ")+
  		("{seconds} seconds");
  		let sentence = pattern
  			.replace("{duration}", pattern)
  			.replace("{days}", days)
  			.replace("{hours}", hours)
  			.replace("{minutes}", minutes)
  			.replace("{seconds}", seconds);
  		return sentence;
    }
}
