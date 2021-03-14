module.exports = {
    name: "restock",
    aliases: ["rs"],
    category: "generator",
    description: "Returns all commands, or one specific command info",
    usage: "[command | alias]",
    run: async (client, message, args) => {
            const embed = {
                title: "Provide Service!",
                description: "Please specify the restocked service!",
                color: 8519796,
                timestamp: new Date(),
                footer: {
                    icon_url:
                        "https://cdn.discordapp.com/attachments/775849290017800203/818875848760492072/zore.png",
                    text: "Zore Generator"
                },
                thumbnail: {
                    url:
                        "https://cdn.discordapp.com/attachments/775849290017800203/818875848760492072/zore.png"
                },
                author: {
                    name: "",
                    url: "",
                    icon_url: client.displayAvatarURL
                },
                fields: []
            };
            let messageArray = message.content.split(" ");
            //let args = messageArray.slice(1);
            if (!message.member.roles.has("809083301179817988"))
                return message.channel.send({embed: {
                    title: "Not an restocker?",	
                    description: "You do not have permissions use the restock command!",	
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
            if (!args[0])
            {
                return message.channel.send({ embed });
            }
            else {
            const embed = {
                title: "Restock!",
                description: args[0] + " has been restocked by " + "<@" + message.author.id +">",
                color: 8519796,
                timestamp: new Date(),
                footer: {
                    icon_url:
                        "https://cdn.discordapp.com/attachments/775849290017800203/818875848760492072/zore.png",
                    text: "Zore Generator"
                },
                thumbnail: {
                    url:
                        "https://cdn.discordapp.com/attachments/775849290017800203/818875848760492072/zore.png"
                },
                author: {
                    name: "",
                    url: "",
                    icon_url: client.displayAvatarURL
                },
                fields: []
            };
            message.channel.send({ embed }); //message.channel.send("The service " + args[0] + " has been restocked by " + "<@" + message.author.id +">");
        }
    }
}