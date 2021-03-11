const Discord = require("discord.js");
const token = require("./token.json");
const bot = new Discord.Client();
const fs = require('fs')	
let settings = JSON.parse(fs.readFileSync(__dirname+"/settings.json"));	
let prefix = settings['prefix'];	
let cooldown = settings['cooldown']	
const generated = new Set();

bot.on("ready", () => {	
    console.log(`Logged in as ${bot.user.tag}!`);	
    console.log("prefix is",prefix,"\nCooldown is",cooldown)	
});

bot.on("message", async message => {	
    prefix = settings['prefix'];	
    cooldown = settings['cooldown']	
    if (message.author.bot) return;	
    var command = message.content	
    .toLowerCase()	
    .slice(prefix.length)	
    .split(" ")[0];	

    if (command === "gen") {	
        if(!message.member.roles.cache.has('819237989971918898')) {
            return message.channel.send("You don't have permission to use the generator!");
        }
        if(message.channel.id !== "818876705359134780") return message.channel.send("This command can be runned only in the generate channel")	

        if (generated.has(message.author.id)) {	
            message.reply("Please wait before generating another account! - " + "Current cooldown is " + cooldown + "ms");	
        } else {
            let messageArray = message.content.split(" ");	
            let args = messageArray.slice(1);	
            if (!args[0]) return message.reply("Please, specify the service you want!");	
            let data;	
            try{	
                data = fs.readFileSync(__dirname + "/" + args[0].toLowerCase() + ".json")	

            } catch{	
                return message.reply(args[0].toLowerCase()+' service do not exists')  	
            } 	
                let account = JSON.parse(data)	
                if (account.length <= 0) 
                return message.reply("There isn't any account available for that service")

                const embed = {	
                    title: "Account Generated!",	
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
                    author: {	
                        name: "",	
                        url: "",	
                        icon_url: bot.displayAvatarURL	
                    },	
                    fields: []	
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
                fs.writeFileSync(__dirname + "/" + args[0] + ".json", JSON.stringify(account));	
                setTimeout(() => {	
                    generated.delete(message.author.id);	
                }, cooldown);		
            }	
        }	
        
        
        

        if (command === "check") {	
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);	
            let data;	
            if (!args[0])	
                return message.reply("Please, specify the service you want!");	
            try{	
                data = JSON.parse(fs.readFileSync(__dirname + "/" + args[0] + ".json"))	
                message.channel.send("There are "+data.length+" account(s) in "+args[0])

            } catch {	
                return message.reply('That service do not exists')  	
            } 	
        }

        if (command == "restock") {
            const embed = {
                title: "Provide Service!",
                description: "Please Provide the Name of the Restocked Service!",
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
                    icon_url: bot.displayAvatarURL
                },
                fields: []
            };
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("You don't have permissions to do that!");
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
                    icon_url: bot.displayAvatarURL
                },
                fields: []
            };
            message.channel.send({ embed }); //message.channel.send("The service " + args[0] + " has been restocked by " + "<@" + message.author.id +">");
            }
        }

        if (command === "change") {	
            if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send("You don't have permission edit the configuration.");
        }
            //return message.reply("Sorry, you can't do it, you are not an admin!");	
            let messageArray = message.content.split(" ");	
            let args = messageArray.slice(1);	
            try{	
                settings[args[0].toLowerCase()] = args[1].toLowerCase()	
                fs.writeFileSync(__dirname+"/settings.json", JSON.stringify(settings));	
                message.reply(args[0]+" changed to "+args[1])	


            } catch{	
                message.reply("An error occured")	
            }	
        }	

        if(command === "stock") {	
            let stock = []	

            fs.readdir(__dirname, function (err, files) {	
                if (err) {	
                    return console.log('Unable to scan directory: ' + err);	
                } 	

                files.forEach(function (file) {	
                    if (!file.includes(".json")) return	
                    if (file.includes('package-lock') || file.includes('package.json') || file.includes('settings.json') || file.includes('token.json')) return	
                    stock.push(file) 	
                });	
                console.log(stock)	

                stock.forEach(async function (data) {	
                    let acc = await fs.readFileSync(__dirname + "/" + data)	
                    //message.channel.send("Current Stock!")
                    //message.channel.send(data.replace(".json","")+" | "+JSON.parse(acc).length+" accounts\n")	
                    const embed = {
                        title: "",
                        description: data.replace(".json","")+" | "+JSON.parse(acc).length+" account(s)\n",
                        color: 8519796,
                        fields: []
                    };
                    message.channel.send({ embed });
                })
            });	
        }	
        
        if(command === "add") {	
            //if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sorry, you can't do it, you are not an admin!");
            if(!message.member.roles.cache.has('809083301179817988')) {
                return message.channel.send("You don't have permission to add accounts!");
            }
                let messageArray = message.content.split(" ");	
                let args = messageArray.slice(1);	
                var acc = args[1].split(":");	

                fs.readFile(__dirname + "/" + args[0].toLowerCase() + ".json",function(err, data) { 	
                if(err){	
                    let newnewData = 	
                    [{	
                        "email":acc[0],	
                        "password":acc[1]	
                    }]	
                    try {	
                        fs.writeFileSync(__dirname + "/" + args[0].toLowerCase()+".json", JSON.stringify(newnewData))	
                        message.reply("Service Created and account added!")	
                    } catch {	
                        message.channel.send('**Error** Cannot create service and add that account!')	

                    }	

                }	else {
                    let newData = {"email":acc[0],"password":acc[1]}	
                    data = JSON.parse(data)	
                    try{	
                        data.push(newData)	
                        fs.writeFileSync(__dirname + "/" + args[0].toLowerCase()+".json", JSON.stringify(data))	
                        message.reply("Account added!")	
                    } catch {	
                        message.channel.send('**Error** Cannot add that account!')	
                    }	
                }	
            }); 	
        }	

        if(command === "help") {	
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
})	

bot.login(token.token);