const mineflayer = require('mineflayer');
const { pathfinder } = require('mineflayer-pathfinder');

//////
// CONFIGS 
//////

// Bot configuration
const bot = mineflayer.createBot({
    host: 'localhost',
    port: 25565,
    version: "1.20",
    username: 'MineBot',
    viewDistance: "tiny",
});
bot.loadPlugin(pathfinder);

//////
// DEPENDENCIES
//////

//// Chat Dep
const chat = require('./chat/chat');
const follow = require('./chat/follow/follow');
const build = require('./chat/build/build');

const walk = require('./movements/walking/walk');
walk(bot);

const line = require('./chat/build/parts/line');
line(bot);
// const wall = require('./chat/build/parts/wall');
// wall(bot);

//// Load the chat dep
// chat(bot);
// follow(bot);
build(bot);

//////
// MAIN
//////

// Log the bot
bot.on('login', () => {
    console.log(`🟢 ${bot.username} Joined the server !`);
});

// Error Handling
bot.on('error', (err) => {
    console.error('Une erreur est survenue:', err);
});