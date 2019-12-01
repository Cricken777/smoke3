const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone : false});
const botconfig = require("./botconfig.json");
//fs-extra//emoji.szena mondjuk xd
// const cooldown = require("./cooldown.json");
let name = "Cassiopeia bot";

////////////////////////////////////////////////

//Feljebb vannak a globális változók.
 
 
 
bot.on("ready", async() => { //bot.on kezdete
    console.log(`${bot.user.username} elindult sikeresen!`)
 
//status :d   
let prefix = botconfig.prefix; 
    let statusok = [
        `parancsok: ${prefix}help`,
        `${bot.guilds.size} szerver`,
        `fejlesztő: Magyar Games`

    ]
    
 
    setInterval(function(){
        let status = statusok[Math.floor(Math.random() * statusok.length)];
        bot.user.setActivity(status, {type: "WATCHING"}) 
    }, 3000) 


}); //itt vége a bot.on nak
 
 
 
bot.on("message", async message => { //bot on kezdete
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
 //prefix messageArray és cmd :D cmd = 0. karakter prefix = botconfig.prefix :D
    let prefix = botconfig.prefix; 
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
 


/////////////////////////////////////////////////////////////
 
   if(cmd === `${prefix}help`){
 
 
    let botThumb = bot.user.displayAvatarURL;
    let testembed = new Discord.RichEmbed()
    .setTitle(`${name}`)
    .setColor("#2DE7F7")
    .addBlankField()
    .addField("Parancsok:", "ˇˇˇ")
    .addBlankField()
    .addField(`${prefix}kick <@név>`, "Ember kickelése.")
    .addField(`${prefix}ban <@név>`, "Ember bannolása.")
    .addField(`${prefix}mute <@név>`, "Ember muteolása.")
    .addField(`${prefix}tempmute <@név> <3m, 5m, 15m, 30m, 1h>`, "Ember mutolása (meghatározott időre!)")
    .addField(`${prefix}unmute <@név>`, "Feloldja a némítást!")
    .addBlankField()
    .addField("A bot fejlesztője: Magyar Games", "<3")
    .setThumbnail(botThumb)
    .setTimestamp(message.createdAt)
    .setFooter(`${name}`);
 
    message.channel.send(testembed);
    
}


if(cmd === `${prefix}kick`) {
    if(message.guild.member(bot.user).hasPermission("ADMINISTRATOR")) {
    if (message.member.hasPermission("KICK_MEMBERS")) {
    let kickPerson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (kickPerson) {
    if (!kickPerson.hasPermission("KICK_MEMBERS")) {
    let bicon = bot.user.displayAvatarURL;

    let kickEmbed = new Discord.RichEmbed()
    .setTitle("**Kick**")
    .setDescription("Kicking...")
    .setColor("#ff0000")
    .setThumbnail(bicon)
    .addField(`${kickPerson.user.username} kickelve lett!`, "ˇˇˇˇ")
    .addField("Kickelte:", `${message.member} ezt az embert: ${kickPerson.user.username}`)
    .setTimestamp(message.createdAt)
    .setFooter(`${name}`);

    message.guild.member(kickPerson.id).kick();
    message.channel.send(kickEmbed);
    console.log(`${message.author.id} kickelte ${kickPerson}!`);

    } else message.channel.send("A szerver adminjait nem tudod kickelni!");

    } else message.channel.send("Kérlek adj meg egy nevet! (pl: @asd)");

    } else message.channel.send("Neked nincs jogod hogy kickelj!");
} else message.reply("Ahhoz hogy ez a parancs sikeresen működjön ahhoz nekem administratornak kéne lennem. Kérlek add meg nekem az 'ADMINISTRATOR' jogot.")

}

if(cmd === `${prefix}ban`) {
    if(message.guild.member(bot.user).hasPermission("ADMINISTRATOR")) {
    if (message.member.hasPermission("KICK_MEMBERS")) {
    let kickPerson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (kickPerson) {
    if (!kickPerson.hasPermission("KICK_MEMBERS")) {
    let bicon = bot.user.displayAvatarURL;

    let kickEmbed = new Discord.RichEmbed()
    .setTitle("**Ban**")
    .setDescription("Ban hammer time!")
    .setColor("#ff0000")
    .setThumbnail(bicon)
    .addField(`${kickPerson.user.username} bannolva lett!`, "ˇˇˇˇ")
    .addField("Bannolta:", `${message.member} ezt az embert: ${kickPerson.user.username}`)
    .setTimestamp(message.createdAt)
    .setFooter(`${name}`);

    message.guild.member(kickPerson.id).ban();
    message.channel.send(kickEmbed);
    console.log(`${message.author.id} bannolta: ${kickPerson}!`);

    } else message.channel.send("A szerver adminjait nem tudod bannolni!");

    } else message.channel.send("Kérlek adj meg egy nevet! (pl: @asd)");

    } else message.channel.send("Neked nincs jogod hogy bannolj!");
} else message.reply("Ahhoz hogy ez a parancs sikeresen működjön ahhoz nekem administratornak kéne lennem. Kérlek add meg nekem az 'ADMINISTRATOR' jogot.")

}

 let cdrole = message.guild.roles.find(`name`, `muted`);
if(!cdrole) {
    message.guild.createRole({
        name: 'muted',
        hoist: false,
        mentionable: false
    });
};
 
if (cmd === `${prefix}mute`) {
    if(message.guild.member(bot.user).hasPermission("ADMINISTRATOR")) {
    let muterang = message.guild.roles.find(`name`, `muted`);
    let mute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(message.member.hasPermission("KICK_MEMBERS")) {
    if(mute) {
    if(!mute.hasPermission("KICK_MEMBERS")) {
    if(!mute.roles.has(muterang.id)) {

    message.channel.send(`<@${mute.id}> némítva lett!`)

    mute.addRole(muterang.id);

    } else message.channel.send("Ez az ember már némítva van!")
    } else message.channel.send("A szerver adminjait nem tudod némítani!");
    } else message.channel.send("Kérlek írj be egy nevet. (pl: @asd)");
    } else message.reply("Nincs jogod hogy némíts!");
} else message.reply("Ahhoz hogy ez a parancs sikeresen működjön ahhoz nekem administratornak kéne lennem. Kérlek add meg nekem az 'ADMINISTRATOR' jogot.")
}


if (cmd === `${prefix}tempmute`) {
    if(message.guild.member(bot.user).hasPermission("ADMINISTRATOR")) {
    let muterang = message.guild.roles.find(`name`, `muted`);
    let mute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(message.member.hasPermission("KICK_MEMBERS")) {
    if(mute) {


    if(!mute.hasPermission("KICK_MEMBERS")) {
    if(!mute.roles.has(muterang.id)) {
        if(args[1] === `3m`) { 
            message.channel.send(`<@${mute.id}> némítva lett 3 percre!`)

            mute.addRole(muterang.id);

            setTimeout(() => {
                mute.removeRole(muterang.id);
            }, 180000);
        } else if(args[1] === `5m`) { 
            message.channel.send(`<@${mute.id}> némítva lett 5 percre!`)

            mute.addRole(muterang.id);

            setTimeout(() => {
                mute.removeRole(muterang.id);
            }, 300000);
        } else if(args[1] === `15m`) { 
            message.channel.send(`<@${mute.id}> némítva 15 percre!`)

            mute.addRole(muterang.id);

            setTimeout(() => {
                mute.removeRole(muterang.id);
            }, 900000);
        } else if(args[1] === `30m`) { 
            message.channel.send(`<@${mute.id}> némítva 30 percre!`)

            mute.addRole(muterang.id);

            setTimeout(() => {
                mute.removeRole(muterang.id);
            }, 1800000);
        } else if(args[1] === `1h`) { 
            message.channel.send(`<@${mute.id}> némítva lett 1órára!`)

            mute.addRole(muterang.id);

            setTimeout(() => {
                mute.removeRole(muterang.id);
            }, 3600000);
        } else return message.reply("Kérlek írj be egy időt! (3m, 5m, 15m, 30m, 1h)")
    } else message.channel.send("Ez az ember már némítva van!");
    } else message.channel.send("A szerver adminjait nem tudod némítani!");
    } else message.channel.send("Kérlek írj be egy nevet. (pl: @asd)");
    } else message.reply("Nincs jogod hogy némíts!");
} else message.reply("Ahhoz hogy ez a parancs sikeresen működjön ahhoz nekem administratornak kéne lennem. Kérlek add meg nekem az 'ADMINISTRATOR' jogot.")
}
////////////////////////////////////////////////////////////////////////////////////////////////////

if (cmd === `${prefix}unmute`) {
    if(message.guild.member(bot.user).hasPermission("ADMINISTRATOR")) {
    let muterang = message.guild.roles.find(`name`, `muted`);
    let mute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(message.member.hasPermission("KICK_MEMBERS")) {
    if(mute) {
    if(mute.roles.has(muterang.id)) {

    message.channel.send(`<@${mute.id}> -nak/nek fel lett oldva a némítása!`)

    mute.removeRole(muterang.id);

    } else message.channel.send("Ez az ember nincs némítva!")
    } else message.channel.send("Kérlek írj be egy nevet. (pl: @asd)");
    } else message.reply("Nincs jogod hogy felnémíts!");
} else message.reply("Ahhoz hogy ez a parancs sikeresen működjön ahhoz nekem administratornak kéne lennem. Kérlek add meg nekem az 'ADMINISTRATOR' jogot.")
}

let nemitottrang = message.guild.roles.find(`name`, `muted`);
if(!message.member.hasPermission("KICK_MEMBERS")) {
if(message.member.roles.has(nemitottrang.id)) {
    message.delete();
}
}

   
})
 
bot.login(process.env.BOT_TOKEN);
