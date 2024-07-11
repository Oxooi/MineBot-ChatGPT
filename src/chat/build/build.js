const gpt = require('../../GPT/CGPT');
const tower = require('./components/buildTower');
const wall = require('./parts/wall');
const parseCommand = require('./components/parseCommand');

module.exports = (bot) => {
    bot.on('chat', async (username, message) => {
        if (username === bot.username) return;
        const construction = parseCommand.parseConstructionCommand(message);
        if (construction) {
            if (construction.type === "tour") {
                tower.buildTower(bot, construction.height.height, construction.material);
            } else {
                bot.chat("Je ne suis pas sûr de ce que tu veux que je construise.");
            }
        }
    });
};