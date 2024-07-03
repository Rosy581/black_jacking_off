const {
    REST,
    Routes,
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require("discord.js");

const cmnds = [
    {
        name: "deal",
        description: "Gamble your life away",
    },{
        name: "pay",
        description: "Send money to another user",
        options:[
            {
                name:"amount",
                description:"Amount you want to send to another person",
                type:ApplicationCommandOptionType.Number,
                required:true
            },{
                name:"user",
                description:"Ping/@ user here to pay them",
                type:ApplicationCommandOptionType.User,
                required:true
            }
        ]
    },{
        name:"register",
        description:"Register as a certified GAMBLER"
    },{
        name:"balance",
        description:"Get your or an other person's balance",
        options:[
            {
                name:"user",
                description:"Input the user who's ballence you want to see if you want to see your own leave blank",
                type:ApplicationCommandOptionType.User,
                required:false
            }
        ]
    },{
        name:"baltop",
        description:"see who's the richest mf"
    },{
        name:"coinflip",
        description:"flip a coin to double ur $$$",
        options:[
            {
                name:"bet",
                description:"How much do you want to bet",
                type:ApplicationCommandOptionType.Number,
                required:true
            }
        ]
    },{
        name:"print",
        description:"Rosy can print money",
        options:[
            {
                name:"mmmmm",
                description:"yummers",
                type:ApplicationCommandOptionType.Number,
                required:true
            }
        ]
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