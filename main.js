const express = require('express');
const app = express();
const alder32 = require('adler-32');
const Discord = require('discord.js');
require('dotenv').config()
var active = []
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
client.once('ready', ()=>{
    console.log('Ready')
})
client.login(process.env.PASSWORD /* Bot token */)
app.get('/verify/:name/:code', (req, res)=>{
    var name = req.params.name
    var code = req.params.code
    // find object for the verification code
    var verications = active.find(obj=>obj.code==code)
    if(verications !== undefined) {
        // code is valid
        client.guilds.fetch(verications.guild.id.toString()).then(guild=>{ // fetch guild from code
            guild.fetch().then(g=>{ //convert Oauth2Guild to Guild object
                g.members.fetch(verications.id).then(user=>{ //fetch user
                    // get verification role, apply role, set nickname
                    role = g.roles.cache.find(r=>r.name==='Verified')
                    user.roles.add(role)
                    user.setNickname(name, "Verified!").then()
                    res.send('success')
                })
            })
            active = active.filter((v, i, a)=>v.code!==code)
        })
    }else{
        // code is'nt valid
        res.send('verification code doesnt exist, unable to get user')
    }
})
function gencode(id) {
    return alder32.str(id)
}
function create(id, code, guild) {
    active.push({code: code, id: id, guild: guild})
}
client.on('messageCreate', message=>{
    if(message.content.startsWith('!verify')) {
        role = message.guild.roles.cache.find(r=>r.name==='Verified')
        // check if user has the role, if undefined the user does'nt have it
        urole = message.member.roles.cache.toJSON().find(r=>r.id===role.id)
        if(urole!==undefined) {
            message.channel.send(`<@${message.author.id}> You are already verified.`)
        }else{
            message.author.send(`Your code is ${gencode(message.author.id)}.`)
            create(message.author.id,gencode(message.author.id),message.guild)
        }
        message.delete()
    }
})
app.listen(process.env.PORT || 8080, _=>{
    console.log('Listening')
})