const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "report",
    category: "generator",
    description: "Reports a member",
    usage: "<mention, id>",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

        if(!args[0])
            return message.channel.send({embed: {
                    title: "Missing account?",	
                    description: "Please provide an account!",	
                    color: 8519796,	
                    timestamp: new Date(),
                    "footer": {
                        icon_url:
                            "https://cdn.discordapp.com/attachments/775849290017800203/818875848760492072/zore.png",
                        text: "Zore Generator"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/attachments/775849290017800203/818875848760492072/zore.png"
                        }
                    }
                }
            );

        const channel = message.guild.channels.find(c => c.name === "reports")
            
        if (!channel)
            return message.channel.send("Couldn't find a `#reports` channel").then(m => m.delete(5000));

        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setTitle("Reported account", "")
            .setDescription(stripIndents`
            **- Reported by:** ${message.member}
            **- Reported in:** ${message.channel}
            **- Reason:** ${args.slice(0).join(" ")}`);

        return channel.send(embed);
    }
}