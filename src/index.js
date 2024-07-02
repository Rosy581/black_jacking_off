require("dotenv").config();
require("firebase/firestore")
const admin = require("firebase-admin");
const run = require("./register-commands").run;
const cmds = require("./register-commands.js").cmnds;
const serviceAccount = require("../ServiceAccountKey");
const { push, pull, pullColl, sleep } = require("../script.js");
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

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const newUser = async (user) => {
	const doc = await pull(db, "money", user.interaction.user.id)
	console.log(!!doc)
	if (!!doc) {
		console.log("thang")
		return false
	} else {
		db.collection("money")
			.doc(user.interaction.user.id)
			.set({
				points: 100,
				username: user.username
			})
		return true
	}
}

bot.on("interactionCreate", async (interaction) => {
	if (interaction.isChatInputCommand()) {
		console.log(
			`${interaction.user.username} command ${interaction.commandName}`
		);
		switch (interaction.commandName) {
			case "pay":
				let user = interaction.options.get("user").value
				const amount = interaction.options.get("amount").value
				if (user == interaction.user.id) {
					await interaction.reply("you cannot send money to yourself")
					return
				}
				let recipient = await pull(db, "money", user)
				let sender = await pull(db, "money", interaction.user.id)
				if (amount > sender.points) {
					await interaction.reply("You dont have that many gcerver tokens!")
					return;
				} else if (amount < 1) {
					await interaction.reply("Must be a positive number!")
					return;
				}
				sender.points -= amount
				recipient.points += amount
				console.log("user:", recipient.points)
				console.log("other guy:", sender.points)
				await push(db, "money", user, recipient)
				await push(db, "money", interaction.user.id, sender)
				interaction.reply(`Your new balance:${sender.points}\nTarget's new balance:${recipient.points}`)
				break;
			case "register":
				if (await newUser(interaction.user)) {
					interaction.reply("You've been registered! Your new balanece is 100 gcerver tokens!")
				} else {
					interaction.reply("You've already registered idIOT!!!")
				}
				break;
			case "balance":
				const used = interaction.options.get("user") ? interaction.options.get("user").value : interaction.user.id
				const { points, username } = await pull(db, "money", used)
				if (interaction.options.get("user")) {
					interaction.reply(`${username}'s balance: ${points}`)
				} else {
					interaction.reply(`Your balance: ${points}`)
				}
				break;
			case "baltop":
				let dat = await pullColl(db, "money")
				dat.sort((a, b) => { return b.points - a.points })
				let top = []
				for (let i = 0; i < dat.length; i++) {
					console.log(dat[i]);
					let { username, points } = dat[i]
					top.push(`${i + 1}.${username} -- ${points}`)
				}
				top = top.join("\n")
				await interaction.reply({ content: top, ephemeral: false })
				break;
			case "deal":
				let initbet = interaction.options.get("bet").value
				let banker = await pull(db, "money", interaction.user.id)
				let startBall = bank.points
				if (initbet > banker.points) {
					await interaction.reply("You dont have that many gcerver tokens!")
					return;
				} else if(bet <1){
					await interaction.reply("Must be a positive number!")
					return;
				}
				break;
			case "coinflip":
				let bet = interaction.options.get("bet").value
				let bank = await pull(db, "money", interaction.user.id)
				let startBal = bank.points
				if (bet > bank.points) {
					await interaction.reply("You dont have that many gcerver tokens!")
					return;
				} else if(bet <1){
					await interaction.reply("Must be a positive number!")
					return;
				}
				let flip = Math.round(Math.random())
				if (flip) {
					bank.points += bet
					await push(db, "money", interaction.user.id, bank)
					interaction.reply(`<:poker_chips:1257549657152946297> **You WON!!**\nOld balance : ${startBal}\nNew balance : ${bank.points}`)
				} else {
					bank.points -= bet
					await push(db, "money", interaction.user.id, bank)
					interaction.reply(`<:poker_chips:1257549657152946297> **You LOST!!**\nOld balance : ${startBal}\nNew balance : ${bank.points}`)
				}
				break;

		}
	}
})

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