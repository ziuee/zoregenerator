const Discord = require("discord.js");
const { RichEmbed } = require("discord.js");
const { Client, Collection } = require("discord.js");
const token = require("./token.json");
const bot = new Discord.Client();
const fs = require('fs')	
let settings = JSON.parse(fs.readFileSync(__dirname+"/settings.json"));	
let prefix = settings['prefix']	
let cooldown = settings['cooldown']
const generated = new Set();

bot.commands = new Collection();
bot.aliases = new Collection();

bot.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});

bot.on("ready", () => {
	console.log(" ");
    console.log("███████╗ ██████╗ ██████╗ ███████╗");
    console.log(" ╚═███╔╝██╔═══██╗██╔══██╗██╔════╝");
    console.log("  ███╔╝ ██║   ██║██████╔╝█████╗ ");
    console.log(" ███╔╝  ██║   ██║██╔══██╗██╔══");
    console.log("███████╗╚██████╔╝██║  ██║███████╗");
    console.log("╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝");
	/*console.log(`
__________                    
\____    /___________   ____  
  /     //  _ \_  __ \_/ __ \ 
 /     /(  <_> )  | \/\  ___/ 
/_______ \____/|__|    \___
                              `);*/
	console.log(" ");
    console.log(`You have logged into the bot ${bot.user.tag}!`);
    console.log(" ");
	console.log("Current prefix is", prefix, "\nCurrent cooldown is", cooldown/1000 + "seconds")

	bot.user.setPresence({
		status: "dnd",
		game: {
			name: "Zore Generator 2.0",
			type: "WATCHING"
		}
	});
})

bot.on("message", async message => {
	prefix = settings['prefix']
	cooldown = settings['cooldown']

	if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));

    if (command) 
        command.run(bot, message, args);
    /*var command = message.content
    .toLowerCase()	
    .slice(prefix.length)
    .split(" ")[0];	*/

	if (message.content.startsWith(prefix + "gen")) {
        if(!message.member.roles.has("819237989971918898")) {
            return message.channel.send({embed: {
                    title: "Not purchased yet?",	
                    description: "You do not have access to use this generator, if you wish to get access check the prices channel!",	
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
            //return message.channel.send("You don't have permission to use the generator!");
        }
        if(message.channel.id !== "818876705359134780")
             return message.channel.send({embed: {
                    title: "Not in correct channel?",	
                    description: "You can only generate accounts in the generate channel!",	
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
            ).then(message => { message.delete({ timeout: 2000});
            }).catch();
            
        //return message.channel.send("This command can be runned only in the generate channel")	

        if (generated.has(message.author.id)) {	
            message.channel.send({embed: {
                    title: "Take it slow",	
                    description: "Please wait before generating another account!",	
                    color: 8519796,	
                    timestamp: new Date(),
                    "fields": [	
                        {
                            "name": "Cooldown",
                            "value": cooldown/1000 + " seconds",
                        }
                    ],
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
            //message.reply("Please wait before generating another account! - " + "Current cooldown is " + cooldown/1000 + "seconds");	
        } else {
            let messageArray = message.content.split(" ");	
            let args = messageArray.slice(1);	
            if (!args[0]) 
            return message.channel.send({embed: {
                        title: "Service?",	
                        description: "Please specify the service you want to generate!",	
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
            //return message.reply("Please, specify the service you want!");	
            let data;	
            try{	
                data = fs.readFileSync(__dirname + "/commands/generator/" + args[0].toLowerCase() + ".json")	

            } catch{
                return message.channel.send({embed: {
                    title: "Invalid Service",	
                    description: "The service you provided does not exist!",	
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
                //return message.reply(args[0].toLowerCase()+' service do not exists')  	
            } 	
                let account = JSON.parse(data)	
                if (account.length <= 0) 
                    return message.channel.send({embed: {
                        title: "Out of stock!",	
                        description: "Restocking soon!",	
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
                    
                const embed = {	
                    title: args[0] + " Account Generated!",	
                    description: "Check your dm for the account's information!",	
                    color: 8519796,	
                    timestamp: "2021-03-04T14:16:26.398Z",	
                    footer: {	
                        icon_url:	
                            "https://cdn.discordapp.com/attachments/775849290017800203/818875848760492072/zore.png",	
                        text: "Zore Generator"	
                    },	
                    thumbnail: {	
                        url:	
                            "http://www.compartosanita.it/wp-content/uploads/2019/02/right.png"	
                    },
                    
                };	

                await message.channel.send({ embed });	
                await generated.add(message.author.id);	
                await message.author.send({embed: {	
                    "title": "Account information",	
                    "color": 8519796,
                    timestamp: new Date(),
                    footer: {
                    icon_url:
                        "https://cdn.discordapp.com/attachments/775849290017800203/818875848760492072/zore.png",
                    text: "Zore Generator"
                    },
                    thumbnail: {
                    url:
                        "https://cdn.discordapp.com/attachments/775849290017800203/818875848760492072/zore.png"
                    }  ,
                    "fields": [	
                        /*{	
                        "name": "Email",	
                        "value": account[0].email	
                        },	
                        {	
                        "name": "Password",	
                        "value": account[0].password	
                        },
                        {
                        "name": "‏‏‎ ‎‎‎",
                        "value": "‏‏‎ ‎"
                        },*/
                        {
                            "name": "Email:Password",
                            "value": account[0].email+":"+account[0].password
                        },
                        {
                            "name": "Service:",
                            "value": args[0]
                        }
                    ]	
                    }	
                })	
                //await message.author.send("copy-paste: "+account[0].email+":"+account[0].password)	
                account.splice(0,1)	
                console.log(account)	
                fs.writeFileSync(__dirname + "/commands/generator/" + args[0] + ".json", JSON.stringify(account));	
                setTimeout(() => {	
                    generated.delete(message.author.id);	
                }, cooldown);		
            }	
        }

        if (message.content.startsWith(prefix + "check")) {
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);	
            let data;	
            if (!args[0])	
                return message.channel.send({embed: {
                    title: "No service provided!",	
                    description: "Please specify the service you want to check!",	
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
                //return message.reply("Please, specify the service you want!");	
            try{	
                data = JSON.parse(fs.readFileSync(__dirname + "/commands/generator/" + args[0] + ".json"))	
                message.channel.send({embed: {
                        title: "Account Checker",	
                        description: args[0] + " | " + data.length,	
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
                //message.channel.send("There are "+data.length+" account(s) in "+args[0])

            } catch {	
                return message.channel.send({embed: {
                    title: "Invalid Service",	
                    description: "The service you provided does not exist!",	
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
                //return message.reply('That service do not exists')  	
            } 	
        }

        if (message.content.startsWith(prefix + "change")) {
            if(!message.member.roles.has("810458912267698186")) {
                return message.channel.send({embed: {
                    title: "Not a remi?",	
                    description: "You do not have permissions to change the bot settings!",	
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
            //return message.channel.send("You don't have permission edit the configuration.");
        }
            //return message.reply("Sorry, you can't do it, you are not an admin!");	
            let messageArray = message.content.split(" ");	
            let args = messageArray.slice(1);	
            try{	
                settings[args[0].toLowerCase()] = args[1].toLowerCase()	
                fs.writeFileSync(__dirname+"/settings.json", JSON.stringify(settings));	
                 message.channel.send({embed: {
                        title: "Management",	
                        description: args[0] + " has been changed to " + args[1],	
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
                //message.reply(args[0]+" changed to "+args[1])	


            } catch{
                message.channel.send({embed: {
                title: "Management",	
                description: "Please specify the setting you want to change!",	
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
                }}}
                );
                //message.reply("An error occured")	
            }	
        }

        if (message.content.startsWith(prefix + "add")) {
            //if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sorry, you can't do it, you are not an admin!");
            if(!message.member.roles.has("809083301179817988")) {
                return message.channel.send("You don't have permission to add accounts!");
            }
                let messageArray = message.content.split(" ");	
                let args = messageArray.slice(1);	
                var acc = args[1].split(":");	

                fs.readFile(__dirname + "/commands/generator/" + args[0].toLowerCase() + ".json",function(err, data) { 	
                if(err){	
                    let newnewData = 	
                    [{	
                        "email":acc[0],	
                        "password":acc[1]	
                    }]	
                    try {	
                        fs.writeFileSync(__dirname + "/" + args[0].toLowerCase()+".json", JSON.stringify(newnewData))	
                        message.channel.send({embed: {
                            title: "Account Manager",	
                            description: "Service has been created and account has been added!",	
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
                        //message.reply("Service Created and account added!")	
                    } catch {	
                        message.channel.send({embed: {
                            title: "Account Manager",	
                            description: "Cannot create service and add that account!",	
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
                       //message.channel.send('**Error** Cannot create service and add that account!')	

                    }	

                }	else {
                    let newData = {"email":acc[0],"password":acc[1]}	
                    data = JSON.parse(data)	
                    try{	
                        data.push(newData)	
                        fs.writeFileSync(__dirname + "/commands/generator/" + args[0].toLowerCase()+".json", JSON.stringify(data))	
                        return message.channel.send({embed: {
                            title: "Account Manager",	
                            description: "Account has been added!",	
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
                    } catch {
                        message.channel.send({embed: {
                            title: "Account Manager",	
                            description: "Cannot add that account!",	
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
                        //message.channel.send('**Error** Cannot add that account!')	
                    }	
                }	
            }); 	
        }
        
        if (message.content.startsWith(prefix + "help")) {	
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                message.channel.send({embed: {	
                "title": "Commands",	
                "color": 8519796,	
                timestamp: new Date(),
                "footer": {
                    icon_url:
                        "https://cdn.discordapp.com/attachments/775849290017800203/818875848760492072/zore.png",
                    text: "Zore Generator"
                },
                thumbnail: {
                    url:
                        "https://cdn.discordapp.com/attachments/775849290017800203/818875848760492072/zore.png"
                },
                "fields": [	
                    {	
                    "name": prefix+"gen (Service)",	
                    "value": "Generate an account a spesific service."	
                    },	
                    {	
                    "name": prefix+"check (Service)",	
                    "value": "Check the stock for a spesific service."	
                    },	
                    {	
                    "name": prefix+"stock",	
                    "value": "Check the stock left for all accounts."	
                    }
                ]}
            })	
        } else {	
            message.channel.send({embed: {	
            "title": "Commands",	
            "description": " ",
            "color": 8519796,
            timestamp: new Date(),
            "footer": {
                icon_url:
                    "https://cdn.discordapp.com/attachments/775849290017800203/818875848760492072/zore.png",
                text: "Zore Generator"
            },
            thumbnail: {
                url:
                    "https://cdn.discordapp.com/attachments/775849290017800203/818875848760492072/zore.png"
            },
            "fields": [	
                {	
                "name": prefix+"gen (Service)",	
                "value": "Generate an account a spesific service."	
                },	
                {	
                "name": prefix+"check (Service)",	
                "value": "Check the stock for a spesific service."	
                },	
                {	
                "name": prefix+"stock",	
                "value": "Check the stock left for all accounts."	
                },	
                {	
                "name": prefix+"add (Service) (Account)",	
                "value": "Add an account to a spesific service. (Syntax: email:password)"	
                },	
                {	
                "name": prefix+"change (Option) (Value)",	
                "value": "Change prefix or cooldown (option) to a value, for the cooldown remember that the value must be in ms"	
                }
                ]	
                }	
            })	
        }	
    }
});

bot.login(token.token);
