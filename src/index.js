require("dotenv").config();
const admin = require("firebase-admin");
const run = require("./register-commands").run;
const cmds = require("./register-commands.js").cmnds;
const serviceAccount = require("../ServiceAccountKey");
const { ifDef, pull, pullColl, sleep } = require("../script.js");
const discordJs = require("discord.js");
const {
	Client,
	IntentsBitField,
	ActivityType,
	EmbedBuilder,
	ButtonBuilder,
	ButtonStyle,
	ComponentType,
} = require("discord.js"); 

const bot = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
}); 


bot.on("ready", () => {
	console.log("Alright gamblers lets get gamblin'");
	bot.user.setPresence({
		status: `online`,
		activities: [
			{
				name: "Gambling The Night Away",
				type: ActivityType.Playing,
				state: "No it is suffering",
			},
		],
	});
});
run(cmds);
bot.login(process.env.TOKEN);