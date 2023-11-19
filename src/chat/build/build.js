const gpt = require('../../GPT/CGPT');
const tower = require('./components/buildTower');
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

    // bot.on('chat', (username, message) => {
    //     if (username === bot.username) return;
    //     const itemId = "minecraft:stone";
    //     const itemName = "stone"
    //     const itemCount = 20;

    //     if (message === "inv") {
    //         // Check if the bot has a stone in his inventory
    //         const item = bot.inventory.items().find(item => item.name === itemName);
    //         if (item) {
    //             bot.chat(`J'ai ${item.count} ${itemName}`);
    //         } else {
    //             bot.chat("Je n'ai pas de pierre, je vais m'en give");
    //             bot.chat(`/give ${bot.username} ${itemId} ${itemCount}`);
    //             bot.chat("J'ai de la stone maintenant");
    //         }
    //     }
    // });

};