require("dotenv").config();
require("firebase/firestore")
const admin = require("firebase-admin");
const run = require("./register-commands").run;
const cmds = require("./register-commands.js").cmnds;
const serviceAccount = require("../ServiceAccountKey");
const { pull, pullColl, sleep } = require("../script.js");
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

const pointReader = async (user) =>{
    const docRef = db.collection("money").doc(user.id)
    console.log(user)
    const doc = await docRef.get()
    if(doc.exists){
        return await doc.data()
    } else {
        db.collection("money")
			.doc(user.id)
			.set({
                points:100,
                username:user.username
            })
        return {
            points:100,
            username:user.user
        }
    }
}

bot.on("interactionCreate", async (interaction) => {
	if (interaction.isChatInputCommand()) {
		console.log(
			`${interaction.user.username} command ${interaction.commandName}`
		);
        switch(interaction.commandName){
            case "pay":
                const user = interaction.options.get("user").value
                const amount = interaction.options.get("amount").value
                if(user == interaction.user.id)
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