const express = require('express');
const app = express();
const alder32 = require('adler-32');
const Discord = require('discord.js');
var active = []
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
client.once('ready', ()=>{
    console.log('Ready')
})
client.login('***REMOVED***')
app.get('/verify/:name/:code', (req, res)=>{
    var name = req.params.name
    var code = req.params.code
    var verications = active.find(obj=>obj.code==code)
    if(verications !== undefined) {
        client.guilds.fetch(verications.guild.id.toString).then(guild=>{
            guild.fetch().then(g=>{
                g.members.fetch(verications.id).then(user=>{
                    role = g.roles.cache.find(r=>r.name==='Verified')
                    user.addRole(role)
                    user.setNickname(name, "Verified!").then()
                    res.send('success')
                })
            })
            active = active.filter((v, i, a)=>v.code!==code)
        })
    }else{
        res.send('verification code doesnt exist, unable to get user')
    }
})
function gencode(id) {
    return alder32.str(id)
}
function create(id, code, guild) {
    active.push({code: code, id: id, guild: guild})
}
client.on('message', message=>{
    if(message.content.startsWith('!verify')) {
        message.author.send(`Your code is ${gencode(message.author.id)}`)
        create(message.author.id,gencode(message.author.id),message.guild)
        message.delete()
    }
})
app.listen(process.env.PORT || 8080, _=>{
    console.log('Listening')
})