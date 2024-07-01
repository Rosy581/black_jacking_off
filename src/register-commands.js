const {
    REST,
    Routes,
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require("discord.js");
const { describe } = require("node:test");

const cmnds = [
    {
        name: "deala",
        description: "Gamble your life away",
    }
]



const run = async (cmds) => {
    rest = new REST().setToken(process.env.TOKEN);
    try {
        console.log("loadin :3");
        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            {
                body: cmds,
            }
        );
        console.log("CHILLIN");
    } catch (error) {
        console.log(`there was an error ${error}`);
    }
};
module.exports = { run, cmnds };