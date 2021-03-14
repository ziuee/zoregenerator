module.exports = {
    name: "clear",
    aliases: ["purge"],
    category: "moderation",
    description: "bans the member",
    usage: "<id | mention>",
    run: async (bot, message, args) => {
        if (message.deletable) {
            message.delete();
        }
    
        // Member doesn't have permissions
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send({embed: {
                    title: "Missing permissions?",	
                    description: "You can not remove messages.",	
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
        }

        // Check if args[0] is a number
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.channel.send({embed: {
                    title: "Missing arguments?",	
                    description: "Yeah.... That's not a nubmer? I also can't delete 0 messages by the way.",	
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
            //return message.reply("Yeah.... That's not a numer? I also can't delete 0 messages by the way.").then(m => m.delete(5000));
        }

        // Maybe the bot can't delete messages
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
             return message.channel.send({embed: {
                    title: "Missing permissions?",	
                    description: "Sorry, I don't have permission to clear messages.",	
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
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true).then(deleted =>  message.channel.send({embed: {
                    title: "Purge Manager",	
                    description: `I deleted \`${deleted.size}\` messages.`,	
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
            ))
            .catch(err => message.channel.send({embed: {
                    title: "Purge Manager",	
                    description: `Something went wrong... ${err}`,	
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
            ));

    }
}