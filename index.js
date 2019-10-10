const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const { prefix, token } = require('./config.json');

const client = new CommandoClient({
  commandPrefix: prefix,
  owner: '183647046564184065', // change this to your Discord user ID
  unknownCommandResponse: false
});

client.queue = [];
client.isPlaying = false;
client.songDispatcher = null;
client.isTriviaRunning = false;

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['music', 'Music Command Group'],
    ['gifs', 'Gif Command Group'],
    ['other', 'random types of commands group'],
    ['guild', 'guild related commands']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
  console.log('Ready!');
  client.user.setActivity('!help for commands', 'WATCHING');
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(c => c.name === 'general'); // change this to the channel you want to send the greeting to
  if (!channel) return;
  channel.send(`Welcome ${member}!`);
});

client.login(token);
