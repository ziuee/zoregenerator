const fs = require('fs')	

module.exports = {
    name: "stock",
    aliases: ["accounts"],
    category: "generator",
    description: "Returns all commands, or one specific command info",
    usage: "[command | alias]",
    run: async (client, message, args) => {
            let stock = []	

            fs.readdir(__dirname, function (err, files) {	
                if (err) {	
                    return console.log('Unable to scan directory: ' + err);	
                } 	

                files.forEach(function (file) {	
                    if (!file.includes(".json")) return	
                    if (file.includes('./package-lock') || file.includes('package.json') || file.includes('settings.json') || file.includes('token.json')) return	
                    stock.push(file) 	
                });	
                console.log(stock)	

                stock.forEach(async function (data) {	
                    let acc = await fs.readFileSync(__dirname + "/" + data)	
                    //message.channel.send("Current Stock!")true
                    //message.channel.send(data.replace(".json","")+" | "+JSON.parse(acc).length+" accounts\n")	
                    const embed = {
                        title: "",
                        description: data.replace(".json","")+" | "+JSON.parse(acc).length+" account(s)\n",
                        color: 8519796,
                        fields: []
                    };
                   message.channel.send({ embed })/*.then(message => { message.delete({ timeout: 5000});
                    }).catch();;*/
                })
            });	
    }
}