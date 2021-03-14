const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "ban",
    category: "moderation",
    description: "bans the member",
    usage: "<id | mention>",
    run: async (bot, message, args) => {
        const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel;

        if (message.deletable) message.delete();

        // No args
        if (!args[0]) {
            return message.channel.send({embed: {
                    title: "Forgot to provide a user?",	
                    description: "Please provide a person to ban.",	
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
            /*return message.reply("Please provide a person to ban.")
                .then(m => m.delete(5000));*/
        }

        // No reason
        if (!args[1]) {
            return message.channel.send({embed: {
                    title: "Forgot to add a reason?",	
                    description: "Please provide a reason to ban.",	
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
            /*message.reply("Please provide a reason to ban.")
                .then(m => m.delete(5000));*/
        }

        // No author permissions
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send({embed: {
                    title: "Missing permissions",	
                    description: "❌ You do not have permissions to ban members. Please contact a staff member",	
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
            /*return message.reply("❌ You do not have permissions to ban members. Please contact a staff member")
                .then(m => m.delete(5000));*/
        
        }
        // No bot permissions
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.channel.send({embed: {
                    title: "Missing permissions",	
                    description: "❌ I do not have permissions to ban members. Please contact a staff member",	
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
            /*return message.reply("❌ I do not have permissions to ban members. Please contact a staff member")
                .then(m => m.delete(5000));*/
        }

        const toBan = message.mentions.members.first() || message.guild.members.get(args[0]);

        // No member found
        if (!toBan) {
            return message.channel.send({embed: {
                    title: "Invalid user",	
                    description: "❌ Couldn't find that member, try again",	
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
            /*return message.reply("Couldn't find that member, try again")
                .then(m => m.delete(5000));*/
        }

        // Can't ban urself
        if (toBan.id === message.author.id) {
            return message.channel.send({embed: {
                    title: "Trying to ban yourself?",	
                    description: "❌ You can't ban yourself...",	
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
            /*return message.reply("You can't ban yourself...")
                .then(m => m.delete(5000));*/
        }

        // Check if the user's banable
        if (!toBan.bannable) {
            return message.channel.send({embed: {
                    title: "User has higher role than me?",	
                    description: "❌ I can't ban that person due to role hierarchy, I suppose.",	
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
            /*return message.reply("I can't ban that person due to role hierarchy, I suppose.")
                .then(m => m.delete(5000));*/
        }
        
        const embed = new RichEmbed()
            .setTitle("BAN INFORMATION")
            .setColor("PURPLE")
            .setThumbnail(toBan.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents`**- Banned member:** ${toBan} (${toBan.id})
            **- Banned by:** ${message.member} (${message.member.id})
            **- Reason:** ${args.slice(1).join(" ")}`);

        const promptEmbed = new RichEmbed()
            .setColor("GREEN")
            .setAuthor(`This verification becomes invalid after 15s.`)
            .setDescription(`Do you want to ban ${toBan}?`)

        // Send the message
        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reactioncollector
            const emoji = await promptMessage(msg, message.author, 15, ["✅", "❌"]);

            // Verification stuffs
            if (emoji === "✅") {
                msg.delete();

                toBan.ban(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) 
                            return message.channel.send({embed: {
                                title: "Error?",	
                                description: "❌ Well.... the ban didn't work out. Here's the error ${err}",	
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
                        //return message.channel.send(`Well.... the ban didn't work out. Here's the error ${err}`)
                    });

                logChannel.send(embed);
            } else if (emoji === "❌") {
                msg.delete();
                    message.channel.send({embed: {
                        title: "Cancelled",	
                        description: "❌ The ban has been canceled!",	
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

                /*message.reply(`ban canceled.`)
                    .then(m => m.delete(10000));*/
            }
        });
    }
};